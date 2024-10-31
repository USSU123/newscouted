import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  content: { type: String, required: true },
  media: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

postSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Post = model('Post', postSchema);

export default Post;