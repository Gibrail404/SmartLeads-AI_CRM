import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: String,
  company: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation'],
    default: 'New',
  },
  aiScore: Number,
  lastContact: Date,
  value: Number,
}, { timestamps: true });

export default mongoose.model('Lead', LeadSchema);
