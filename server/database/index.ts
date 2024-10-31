import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
});

// Test the connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Successfully connected to CockroachDB');
  } catch (error) {
    console.error('Failed to connect to CockroachDB:', error);
    process.exit(1);
  }
}

testConnection();

export default prisma;