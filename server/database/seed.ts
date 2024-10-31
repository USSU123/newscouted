import mongoose from 'mongoose';
import { User, Tag } from '../models';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Tag.deleteMany({});

    // Create tags
    const tags = await Tag.create([
      { category: 'Professional Level', value: 'Expert' },
      { category: 'Content Frequency', value: 'Daily' },
      { category: 'Content Type', value: 'Photos' },
      { category: 'Content Type', value: 'Videos' },
    ]);

    // Create test user
    const hashedPassword = await bcrypt.hash('test123', 10);
    await User.create({
      email: 'test@example.com',
      username: '@testuser',
      displayName: 'Test User',
      passwordHash: hashedPassword,
      birthday: new Date('1990-01-01'),
      firstName: 'Test',
      lastName: 'User',
      bio: 'Test bio',
      location: 'Test Location',
      socialLinks: new Map([
        ['twitter', 'https://twitter.com/testuser'],
        ['instagram', 'https://instagram.com/testuser']
      ]),
      tags: tags.map(tag => tag._id)
    });

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seed();