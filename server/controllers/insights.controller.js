import Lead from '../models/lead.model.js';
import MLR from 'ml-regression-multivariate-linear';
// import * as tf from '@tensorflow/tfjs-node';
import * as tf from '@tensorflow/tfjs';
// import * as sk from 'scikitjs';
import * as stats from 'simple-statistics';

// await sk.setBackend(tf); // Required to run scikitjs on Node.js

 
export const kpiMetrics =async (req, res) => {
  try {
    const allLeads = await Lead.find();
    const totalLeads = allLeads.length;

    if (totalLeads === 0) {
      return res.json({
        conversionRate: 0,
        averageDealSize: 0,
        averageSalesCycle: 0,
        winRate: 0,
      });
    }

    const convertedStatuses = ['Qualified', 'Proposal', 'Negotiation', 'Won'];
    const convertedLeads = allLeads.filter(lead => convertedStatuses.includes(lead.status));
    const wonLeads = allLeads.filter(lead => lead.status === 'Won');
    const proposalLeads = allLeads.filter(lead =>
      ['Proposal', 'Negotiation', 'Won'].includes(lead.status)
    );

    const conversionRate = ((convertedLeads.length / totalLeads) * 100).toFixed(2);
    const averageDealSize = (
      convertedLeads.reduce((sum, lead) => sum + (lead.value || 0), 0) /
      (convertedLeads.length || 1)
    ).toFixed(2);

    const averageSalesCycle = (
      convertedLeads.reduce((sum, lead) => {
        const days = (new Date(lead.updatedAt) - new Date(lead.createdAt)) / (1000 * 3600 * 24);
        return sum + days;
      }, 0) / (convertedLeads.length || 1)
    ).toFixed(1);

    const winRate = (
      (wonLeads.length / (proposalLeads.length || 1)) * 100
    ).toFixed(2);

    res.status(200).json({
      conversionRate: Number(conversionRate),
      averageDealSize: Number(averageDealSize),
      averageSalesCycle: Number(averageSalesCycle),
      winRate: Number(winRate),
    });
  } catch (error) {
    console.error('Error fetching KPI metrics:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};


export const revenueForecast = async (req, res) => {
  try {
    const leads = await Lead.find({ status: 'Won' });

    if (leads.length < 2) {
      return res.status(400).json({ error: 'Not enough data to forecast.' });
    }

    // Prepare training data: [month, year] => revenue
    const data = leads.map(lead => {
      const date = new Date(lead.updatedAt);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return { month, year, value: lead.value || 0 };
    });

    // Group by month-year and sum revenue
    const monthlyRevenueMap = {};
    data.forEach(({ month, year, value }) => {
      const key = `${year}-${month}`;
      if (!monthlyRevenueMap[key]) monthlyRevenueMap[key] = 0;
      monthlyRevenueMap[key] += value;
    });

    // Convert to training format
    const X = [], Y = [];
    Object.entries(monthlyRevenueMap).forEach(([key, revenue]) => {
      const [year, month] = key.split('-').map(Number);
      X.push([month, year]);
      Y.push([revenue]);
    });

    // Train model
    const mlr = new MLR(X, Y);

    // Predict next month
    const now = new Date();
    const nextMonth = now.getMonth() === 11 ? 1 : now.getMonth() + 2;
    const nextYear = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();

    const prediction = mlr.predict([[nextMonth, nextYear]])[0][0];

    res.json({
      forecastedMonth: `${nextYear}-${String(nextMonth).padStart(2, '0')}`,
      predictedRevenue: Math.round(prediction),
      trainingSamples: X.length,
    });
  } catch (err) {
    console.error('Revenue Forecasting Error:', err);
    res.status(500).json({ error: 'Server error during forecasting.' });
  }
};


// export const leadScoring = async (req, res) => {
//   try {
//     const leads = await Lead.find();

//     const convertedStatuses = ['Qualified', 'Proposal', 'Negotiation', 'Won'];
//     const statusToWeight = {
//       New: 1,
//       Contacted: 2,
//       Qualified: 3,
//       Proposal: 4,
//       Negotiation: 5,
//       Won: 6,
//       Lost: 0,
//     };

//     const data = leads.map(lead => {
//       const value = lead.value || 0;
//       const statusWeight = statusToWeight[lead.status] || 0;
//       const daysToConvert =
//         (new Date(lead.updatedAt) - new Date(lead.createdAt)) / (1000 * 3600 * 24);
//       return [value, statusWeight, daysToConvert];
//     });

//     const { KMeans } = sk.cluster;
//     const kmeans = new KMeans({ nClusters: 3 }); // High, Medium, Low scoring clusters
//     const result = kmeans.fit(data);

//     // Assign scores based on cluster index (e.g., cluster 2 => high)
//     const scores = result.labels.map(cluster => {
//       if (cluster === 2) return 90 + Math.random() * 10; // High score
//       if (cluster === 1) return 50 + Math.random() * 10; // Medium score
//       return 20 + Math.random() * 10; // Low score
//     });

//     // Combine leadId + score
//     const scoredLeads = leads.map((lead, idx) => ({
//       leadId: lead._id,
//       name: lead.name,
//       email: lead.email,
//       score: Math.round(scores[idx]),
//     }));

//     res.json({ scoredLeads });
//   } catch (error) {
//     console.error('Error scoring leads:', error);
//     res.status(500).json({ error: 'Lead scoring failed' });
//   }
// };


export const detectAnomalies = async (req, res) => {
  try {
    const leads = await Lead.find();

    const delays = leads.map(lead => {
      const delay = (new Date(lead.updatedAt) - new Date(lead.createdAt)) / (1000 * 3600 * 24);
      return isNaN(delay) ? 0 : delay;
    });

    const mean = stats.mean(delays);
    const stddev = stats.standardDeviation(delays);

    const anomalies = leads.filter((lead, index) => {
      const delay = delays[index];
      const zScore = (delay - mean) / stddev;
      return Math.abs(zScore) > 2.5; // Anomaly threshold
    });

    res.json({
      totalLeads: leads.length,
      anomalyCount: anomalies.length,
      anomalies: anomalies.map(lead => ({
        leadId: lead._id,
        name: lead.name,
        email: lead.email,
        daysPending: Math.round(
          (new Date(lead.updatedAt) - new Date(lead.createdAt)) / (1000 * 3600 * 24)
        ),
        status: lead.status,
      })),
    });
  } catch (error) {
    console.error('Anomaly detection error:', error);
    res.status(500).json({ error: 'Anomaly detection failed' });
  }
};


export const recommendActions = async (req, res) => {
  try {
    const leads = await Lead.find();

    const recommendations = leads.map(lead => {
      const now = new Date();
      const ageDays = (now - new Date(lead.createdAt)) / (1000 * 3600 * 24);
      const updatedDaysAgo = (now - new Date(lead.updatedAt)) / (1000 * 3600 * 24);

      let action = 'Review';

      if (lead.status === 'New' && ageDays < 3) {
        action = 'Reach Out';
      } else if (lead.status === 'Contacted' && updatedDaysAgo > 5) {
        action = 'Follow Up';
      } else if (['Qualified', 'Proposal'].includes(lead.status) && updatedDaysAgo > 7) {
        action = 'Escalate';
      } else if (lead.status === 'Won') {
        action = 'Upsell';
      } else if (lead.status === 'Lost') {
        action = 'Close or Recycle';
      }

      // Add features for future ML-based classification
      return {
        leadId: lead._id,
        name: lead.name,
        email: lead.email,
        currentStatus: lead.status,
        aiScore: lead.aiScore,
        value: lead.value,
        ageDays: Math.round(ageDays),
        updatedDaysAgo: Math.round(updatedDaysAgo),
        recommendedAction: action
      };
    });

    res.json({
      totalLeads: leads.length,
      recommendations
    });
  } catch (error) {
    console.error('Recommendation Error:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};


