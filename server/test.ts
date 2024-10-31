import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import { Resend } from 'resend';
import db from './database';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testServices() {
  try {
    console.log('\n🔍 Testing database connection...');
    const dbVersion = db.prepare('SELECT sqlite_version()').get();
    console.log('✅ Database connection successful:', dbVersion);

    console.log('\n🔍 Testing Cloudinary connection...');
    const cloudinaryResult = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful');

    console.log('\n🔍 Testing Resend email service...');
    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<p>This is a test email</p>'
    });
    console.log('✅ Email service test successful');

    // Test user operations
    console.log('\n🔍 Testing user operations...');
    const hashedPassword = await bcrypt.hash('test123', 10);
    
    // Delete test user if exists
    db.prepare('DELETE FROM users WHERE email = ?').run('test@example.com');
    
    // Create test user
    const result = db.prepare(`
      INSERT INTO users (
        id, email, username, displayName, passwordHash,
        birthday, firstName, lastName, bio, location,
        socialLinks
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'test-user-id',
      'test@example.com',
      '@testuser',
      'Test User',
      hashedPassword,
      '1990-01-01',
      'Test',
      'User',
      'Test bio',
      'Test Location',
      JSON.stringify({
        twitter: 'https://twitter.com/testuser',
        instagram: 'https://instagram.com/testuser'
      })
    );
    
    console.log('✅ User operations successful');

    console.log('\n✨ All services are working correctly!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

testServices();