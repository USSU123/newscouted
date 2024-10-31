import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  content: { type: String, required: true },
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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

commentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Comment = model('Comment', commentSchema);

export default Comment;