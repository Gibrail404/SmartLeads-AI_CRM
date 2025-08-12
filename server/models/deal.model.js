import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    required: true
  },
  stage: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  lastContacted: {
    type: Date,
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Deals', dealSchema);
