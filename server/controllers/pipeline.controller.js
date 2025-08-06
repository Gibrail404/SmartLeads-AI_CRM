import Lead from '../models/lead.model.js';
import dayjs from 'dayjs';

export const filterLeads = async (req, res) => {
  try {
    const { status, dealValue, dealAge } = req.query;

    const filters = {};

    // Deal Status
    if (status && status !== 'All') {
      filters.status = status;
    }

    // Deal Value
    if (dealValue) {
      switch (dealValue) {
        case 'under-10000':
          filters.value = { $lt: 10000 };
          break;
        case '10000-50000':
          filters.value = { $gte: 10000, $lte: 50000 };
          break;
        case 'over-50000':
          filters.value = { $gt: 50000 };
          break;
      }
    }

    // Deal Age
    if (dealAge) {
      const now = dayjs();
      let startDate;

      switch (dealAge) {
        case 'today':
          startDate = now.startOf('day').toDate();
          break;
        case 'this-week':
          startDate = now.startOf('week').toDate();
          break;
        case 'this-month':
          startDate = now.startOf('month').toDate();
          break;
        case 'this-quarter':
          const currentMonth = now.month(); // 0-indexed
          const quarterStartMonth = currentMonth - (currentMonth % 3);
          startDate = now.month(quarterStartMonth).startOf('month').toDate();
          break;
      }

      if (startDate) {
        filters.createdAt = { $gte: startDate };
      }
    }

    const leads = await Lead.find(filters).sort({ createdAt: -1 });

    res.status(200).json({ success: true, leads });
  } catch (error) {
    console.error('Error filtering leads:', error);
    res.status(500).json({ success: false, message: 'Error filtering leads' });
  }
};
