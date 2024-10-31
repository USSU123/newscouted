import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  tier: { 
    type: String, 
    required: true,
    enum: ['free', 'pro']
  },
  startDate: { type: Date, default: Date.now },
  endDate: Date,
  autoRenew: { type: Boolean, default: true }
});

const Subscription = model('Subscription', subscriptionSchema);

export default Subscription;