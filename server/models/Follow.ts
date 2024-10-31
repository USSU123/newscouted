import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const followSchema = new Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

followSchema.index({ follower: 1, following: 1 }, { unique: true });

const Follow = model('Follow', followSchema);

export default Follow;