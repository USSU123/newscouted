import mongoose from 'mongoose';
import { config } from 'dotenv';

// Load environment variables
config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('✅ MongoDB connection successful!');
    
    // Test creating a collection
    const db = mongoose.connection.db;
    await db.createCollection('test_collection');
    console.log('✅ Test collection created successfully');
    
    // Clean up
    await db.dropCollection('test_collection');
    console.log('✅ Test collection cleaned up');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed');
  }
}

testConnection();