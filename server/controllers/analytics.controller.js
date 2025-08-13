import Lead from '../models/lead.model.js';
import { subDays } from 'date-fns';

const getTimeRange = (range) => {
    const today = new Date();
    switch (range) {
        case '7d': return subDays(today, 7);
        case '30d': return subDays(today, 30);
        case '90d': return subDays(today, 90);
        case '1y': return subDays(today, 365);
        default: return subDays(today, 30);
    }
};

// export const getLeadAnalytics = async (req, res) => {
//   try {
//     const { timeRange = '30d', status = 'all', source = 'all' } = req.query;
//     const filter = {
//       createdAt: { $gte: getTimeRange(timeRange) }
//     };

//     if (status !== 'all') filter.status = status.charAt(0).toUpperCase() + status.slice(1);
//     if (source !== 'all') filter.source = new RegExp(source, 'i');

//     // Total Leads
//     const totalLeads = await Lead.countDocuments(filter);

//     // Won Deals Stats
//     const wonStats = await Lead.aggregate([
//       { $match: { ...filter, status: 'Won' } },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: '$value' },
//           avgDealSize: { $avg: '$value' }
//         }
//       }
//     ]);

//     // Conversion Funnel
//     const conversionStages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
//     const funnelData = await Lead.aggregate([
//       { $match: filter },
//       { $group: { _id: '$status', count: { $sum: 1 } } }
//     ]);

//     const conversionData = conversionStages.map(stage => {
//       const matched = funnelData.find(item => item._id === stage);
//       const count = matched?.count || 0;
//       return { stage, count };
//     });

//     const totalFunnel = conversionData[0]?.count || totalLeads;
//     conversionData.forEach(d => {
//       d.percentage = totalFunnel ? ((d.count / totalFunnel) * 100).toFixed(0) : 0;
//     });

//     // Performance Chart (Monthly)
//     const monthly = await Lead.aggregate([
//       { $match: filter },
//       {
//         $group: {
//           _id: { $month: '$createdAt' },
//           leads: { $sum: 1 },
//           conversions: {
//             $sum: { $cond: [{ $eq: ['$status', 'Won'] }, 1, 0] }
//           },
//           revenue: {
//             $sum: { $cond: [{ $eq: ['$status', 'Won'] }, '$value', 0] }
//           }
//         }
//       },
//       { $sort: { '_id': 1 } }
//     ]);

//     const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const performanceData = monthly.map(item => ({
//       name: monthNames[item._id - 1],
//       leads: item.leads,
//       conversions: item.conversions,
//       revenue: item.revenue
//     }));

//     // Lead Sources Pie Chart
//     const leadSourceData = await Lead.aggregate([
//       { $match: filter },
//       {
//         $group: {
//           _id: '$source',
//           value: { $sum: 1 }
//         }
//       }
//     ]);

//     // Recent High-Value Leads
//     const recentLeads = await Lead.find(filter)
//       .sort({ value: -1 })
//       .limit(10)
//       .select('name company source status value');

//     return res.json({
//       metrics: {
//         totalLeads,
//         conversionRate: totalLeads
//           ? ((conversionData.find(d => d.stage === 'Won')?.count || 0) / totalLeads * 100).toFixed(1)
//           : 0,
//         revenueGenerated: wonStats[0]?.total || 0,
//         avgDealSize: wonStats[0]?.avgDealSize || 0
//       },
//       performanceData,
//       conversionData,
//       leadSourceData,
//       recentLeads
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// };
export const getLeadAnalytics = async (req, res) => {
    try {
        const { source, status, startDate, endDate } = req.query;

        const filter = {};
        if (source) filter.source = source;
        if (status) filter.status = status;
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) filter.createdAt.$gte = new Date(startDate);
            if (endDate) filter.createdAt.$lte = new Date(endDate);
        }

        const leads = await Lead.find(filter).lean();

        const totalLeads = leads.length;

        const wonLeads = leads.filter(lead => lead.status === 'Won');
        const revenueGenerated = wonLeads.reduce((sum, lead) => sum + (lead.value || 0), 0);
        const avgDealSize = wonLeads.length > 0 ? revenueGenerated / wonLeads.length : 0;

        const conversionStages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'];
        const conversionData = conversionStages.map(stage => {
            const count = leads.filter(lead => lead.status === stage).length;
            const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
            return { stage, count, percentage: parseFloat(percentage.toFixed(2)) };
        });

        const leadSourceCounts = {};
        leads.forEach(lead => {
            leadSourceCounts[lead.source] = (leadSourceCounts[lead.source] || 0) + 1;
        });

        const blueShades = [
            '#60A5FA', 
            '#306eb5d7', 
            '#38BDF8', 
        ];
        const leadSourceData = Object.entries(leadSourceCounts).map(([source, count], index) => ({
            source,
            count,
            color: blueShades[index % blueShades.length],
        }));

        const performanceData = conversionStages.map(stage => {
            const leadsByDate = {};
            leads
                .filter(lead => lead.status === stage)
                .forEach(lead => {
                    const date = new Date(lead.createdAt).toISOString().split('T')[0];
                    leadsByDate[date] = (leadsByDate[date] || 0) + 1;
                });
            return {
                stage,
                trend: Object.entries(leadsByDate).map(([date, count]) => ({ date, count })),
            };
        });

        const highValueLeads = leads
            .filter(lead => lead.value)
            .sort((a, b) => b.value - a.value)
            .slice(0, 10)
            .map(lead => ({
                name: lead.name,
                company: lead.company,
                source: lead.source,
                status: lead.status,
                value: lead.value,
            }));

        const recentLeads = leads
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map(lead => ({
                name: lead.name,
                company: lead.company,
                source: lead.source,
                status: lead.status,
                value: lead.value,
                createdAt: lead.createdAt,
            }));

        const conversionRate = totalLeads > 0 ? (wonLeads.length / totalLeads) * 100 : 0;

        res.json({
            metrics: {
                totalLeads,
                conversionRate: parseFloat(conversionRate.toFixed(2)),
                revenueGenerated: parseFloat(revenueGenerated.toFixed(2)),
                avgDealSize: parseFloat(avgDealSize.toFixed(2)),
            },
            performanceData,
            conversionData,
            leadSourceData,
            recentLeads,
            highValueLeads,
        });

    } catch (error) {
        console.error("Error in getAnalyticsMetrics:", error);
        res.status(500).json({ message: "Server error", error });
    }
};