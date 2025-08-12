import Deals from '../models/deal.model.js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

export const filterDeals = async (req, res) => {
  try {
    // Default values if nothing is passed
    let {
      stage = 'all_stages',
      dealValue = 'all_values',
      dealAge = 'all_time'
    } = req.query;

    const filters = {};

    // Helper to format snake_case → Proper Case
    const fromSnakeCase = (val) => {
      return val
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize each word
    };

    // 1) Stage Filter
    if (stage.toLowerCase() !== 'all_stages') {
      const stageFormatted = fromSnakeCase(stage);
      filters.stage = { $regex: new RegExp(`^${stageFormatted}$`, 'i') };
    }

    // 2) Deal Value Filter
    if (dealValue.toLowerCase() !== 'all_values') {
      const valueMap = {
        'under_200000': { $lt: 200000 },
        '200000_500000': { $gte: 200000, $lte: 500000 },
        'over_500000': { $gt: 500000 }
      };
      if (valueMap[dealValue]) filters.value = valueMap[dealValue];
    }

    // 3) Deal Age Filter
    if (dealAge.toLowerCase() !== 'all_time') {
      const now = dayjs();
      const ageMap = {
        'today': now.startOf('day').toDate(),
        'this_week': now.startOf('week').toDate(),
        'this_month': now.startOf('month').toDate(),
        'this_quarter': now.month(now.month() - (now.month() % 3)).startOf('month').toDate(),
      };

      if (ageMap[dealAge]) {
        filters.lastContacted = {
          $gte: ageMap[dealAge],
          $lte: now.toDate(),
        };
      }
    }


    // Fetch filtered deals
    const deals = await Deals.find(filters).sort({ createdAt: -1 });

    const aggregationResult = await Deals.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: "$value" },
          avgValue: { $avg: "$value" },
        }
      }
    ]);

    let totalPipelineValueK = 0;
    let avgDealSizeK = 0;

    if (aggregationResult.length > 0) {
      totalPipelineValueK = Number((aggregationResult[0].totalValue / 1000).toFixed(2));
      avgDealSizeK = Number((aggregationResult[0].avgValue / 1000).toFixed(2));
    };

    const totalNewDeals = await Deals.countDocuments({ stage: "new" });

    const avgCycleResult = await Deals.aggregate([
      {
        $match: {
          lastContacted: { $type: "date" },
          createdAt: { $type: "date" }
        }
      },
      {
        $project: {
          durationDays: {
            $divide: [
              { $subtract: [{ $toDate: "$lastContacted" }, { $toDate: "$createdAt" }] },
              1000 * 60 * 60 * 24
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          avgCycle: { $avg: "$durationDays" }
        }
      }
    ]);

    const avgCycle = avgCycleResult.length ? avgCycleResult[0].avgCycle.toFixed(0) : 14;





    // Format for UI
    const formattedDeals = deals.map(deal => ({
      company: deal.company,
      name: deal.name,
      email: deal.email,
      phone: deal.phone,
      value: `₹${deal.value?.toLocaleString('en-IN') || 0}`,
      stage: deal.stage,
      lastContact: deal.lastContacted
        ? dayjs(deal.lastContacted).fromNow()
        : dayjs(deal.createdAt).fromNow(),
      aiScore: `${Math.floor(Math.random() * 21) + 80}%` // Mock AI score: 80–100%
    }));

    res.status(200).json({
      success: true,
      totalValue: totalPipelineValueK,
      avgDealSizeK,
      totalNewDeals,
      avgCycle,
      filtersApplied: filters,
      count: deals.length,
      deals: formattedDeals
    });

  } catch (error) {
    console.error('Error filtering deals:', error);
    res.status(500).json({ success: false, message: 'Error filtering deals' });
  }
};
