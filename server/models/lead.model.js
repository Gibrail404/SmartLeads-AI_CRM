import mongoose from 'mongoose';

// const LeadSchema = new mongoose.Schema({
//   name: String,
//   company: String,
//   email: String,
//   phone: String,
//   status: {
//     type: String,
//     enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'],
//     default: 'New',
//   },
//   aiScore: Number,
//   lastContact: Date,
//   value: Number,
// }, { timestamps: true });

const LeadSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,

  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost'],
    default: 'New',
  },

  aiScore: {
    type: Number,
    min: 0,
    max: 100,
  },

  lastContact: Date,

  value: Number, // Proposed or actual deal amount

  source: {
    type: String,
    enum: ['Website', 'LinkedIn', 'Email Campaign', 'Referral', 'Event', 'Other'],
    default: 'Other',
  },

  industry: String, // For lead pattern insights

  clientType: {
    type: String,
    enum: ['Startup', 'SMB', 'Enterprise'],
  },

  engagement: {
    demoWatched: { type: Boolean, default: false },
    emailOpened: { type: Boolean, default: false },
    meetingsHeld: { type: Number, default: 0 },
  },

  isOpportunity: { type: Boolean, default: false },

  winReason: String,
  lossReason: String,

  closedAt: Date, // Required for sales cycle calculation
}, { timestamps: true });


export default mongoose.model('Lead', LeadSchema);
