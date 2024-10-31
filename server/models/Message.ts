import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  readAt: Date,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Message = model('Message', messageSchema);

export default Message;