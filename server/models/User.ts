import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: { 
    type: String, 
    required: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  avatar: String,
  coverPhoto: String,
  bio: String,
  location: String,
  birthday: { 
    type: Date, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  lastLogin: Date,
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  firstName: String,
  lastName: String,
  socialLinks: {
    type: Map,
    of: String
  },
  settings: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    default: {}
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
});

userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create index for email
userSchema.index({ email: 1 }, { unique: true });

// Handle duplicate key errors
userSchema.post('save', function(error: any, doc: any, next: any) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email already exists'));
  } else {
    next(error);
  }
});

const User = mongoose.models.User || model('User', userSchema);

export default User;