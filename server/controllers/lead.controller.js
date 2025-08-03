import Lead from '../models/lead.model.js';

// @desc    Get all leads (Protected)
// @route   GET /api/lead
// @access  Private
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leads', error: error.message });
  }
};

// @desc    Get single lead by ID (Protected)
// @route   GET /api/lead/:id
// @access  Private
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead', error: error.message });
  }
};

// @desc    Create new lead (Protected)
// @route   POST /api/lead
// @access  Private
export const createLead = async (req, res) => {
  try {
    const {
      name, company, email, phone, status, aiScore, lastContact, value
    } = req.body;

    // Basic validation
    if (!name || !email || !status || !phone) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const newLead = new Lead({
      name,
      company,
      email,
      phone,
      status,
      aiScore,
      lastContact,
      value
    });

    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    res.status(400).json({ message: 'Error creating lead', error: error.message });
  }
};

// @desc    Update existing lead (Protected)
// @route   PUT /api/lead/:id
// @access  Private
export const updateLead = async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(400).json({ message: 'Error updating lead', error: error.message });
  }
};

// @desc    Delete a lead (Protected)
// @route   DELETE /api/lead/:id
// @access  Private
export const deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);

    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
};
