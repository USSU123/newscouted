import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const likeSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

likeSchema.index({ post: 1, user: 1 }, { unique: true });

const Like = model('Like', likeSchema);

export default Like;