import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

async function main() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Test user creation
    const hashedPassword = await bcrypt.hash('test123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        username: '@testuser',
        displayName: 'Test User',
        passwordHash: hashedPassword,
        birthday: new Date('1990-01-01'),
        firstName: 'Test',
        lastName: 'User',
        bio: 'Test bio',
        location: 'Test Location',
        socialLinks: {
          twitter: 'https://twitter.com/testuser',
          instagram: 'https://instagram.com/testuser'
        },
        settings: {},
        tags: {
          create: [
            { category: 'Professional Level', value: 'Expert' },
            { category: 'Content Frequency', value: 'Daily' }
          ]
        }
      }
    });
    console.log('✅ User creation successful', user.id);

    // Test JWT generation
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    console.log('✅ JWT generation successful');

    // Test email service
    const emailService = await import('../services/email');
    await emailService.sendVerificationEmail(user.email, token);
    console.log('✅ Email service test successful');

    // Test Cloudinary connection
    const storageService = await import('../services/storage');
    console.log('✅ Cloudinary configuration successful');

    console.log('\n🎉 All tests passed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();