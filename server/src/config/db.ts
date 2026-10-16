import { PrismaClient } from '@prisma/client';
import { config } from './index.js';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: config.isProduction ? ['error', 'warn'] : ['error', 'warn'],
  });

if (!config.isProduction) {
  global.prisma = prisma;
}

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✓ Successfully connected to PostgreSQL database via Prisma');
  } catch (error) {
    console.error('✗ Failed to connect to database:', error);
  }
}

