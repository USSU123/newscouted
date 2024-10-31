import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const tagSchema = new Schema({
  category: { type: String, required: true },
  value: { type: String, required: true }
});

tagSchema.index({ category: 1, value: 1 }, { unique: true });

const Tag = model('Tag', tagSchema);

export default Tag;