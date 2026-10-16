import { createApp } from './app.js';
import { config } from './config/index.js';
import { connectDatabase, prisma } from './config/db.js';

async function bootstrap() {
  const app = createApp();

  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`\n=================================================`);
    console.log(`✨ VIDORA EVENTS Island Luxury Backend Server`);
    console.log(`🚀 Running on port: http://localhost:${config.port}`);
    console.log(`📡 Environment: ${config.nodeEnv}`);
    console.log(`=================================================\n`);
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      await prisma.$disconnect();
      console.log('Database disconnected. Process terminated cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  console.error('Fatal bootstrap error:', err);
  process.exit(1);
});

