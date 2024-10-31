import { PrismaClient } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { Resend } from 'resend';

// Initialize services
const prisma = new PrismaClient();
const resend = new Resend('re_Fs7F15aB_C5NAABsPH2brTX6yMGyHgYz5');

cloudinary.config({
  cloud_name: 'dvzazessx',
  api_key: '317355127271733',
  api_secret: 'jyUxoouiN31x0cp3Rv6bYxPM76E'
});

async function testServices() {
  try {
    // Test Database Connection
    console.log('Testing Supabase connection...');
    const user = await prisma.user.findFirst();
    console.log('✅ Database connection successful');

    // Test Cloudinary
    console.log('\nTesting Cloudinary connection...');
    const cloudinaryTest = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful');

    // Test Resend
    console.log('\nTesting Resend email service...');
    const emailTest = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'test@example.com',
      subject: 'Test Email',
      html: '<p>Test email from backend</p>'
    });
    console.log('✅ Email service test successful');

    console.log('\n🎉 All services are working correctly!');
  } catch (error) {
    console.error('\n❌ Error testing services:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testServices();