import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { config } from './config/index.js';
import { generalLimiter } from './middleware/rate-limit.middleware.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import inquiriesRoutes from './routes/inquiries.routes.js';
import portfolioRoutes from './routes/portfolio.routes.js';
import servicesRoutes from './routes/services.routes.js';
import faqsRoutes from './routes/faqs.routes.js';

export function createApp(): Express {
  const app = express();

  // Security Headers
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allows flexible integration in dev/proxy setups
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS Configuration
  app.use(
    cors({
      origin: [config.clientOrigin, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // Parsers & Cookies
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  // Logging (in development)
  if (!config.isProduction) {
    app.use(morgan('dev'));
  }

  // Rate Limiting
  app.use('/api', generalLimiter);

  // Health check
  app.get('/api/health', (req, res) => {
    res.status(200).json({
      status: 'healthy',
      brand: 'VIDORA EVENTS SRI LANKA',
      timestamp: new Date().toISOString(),
      environment: config.nodeEnv,
    });
  });

  // Mount API modules
  app.use('/api/auth', authRoutes);
  app.use('/api/inquiries', inquiriesRoutes);
  app.use('/api/portfolio', portfolioRoutes);
  app.use('/api/services', servicesRoutes);
  app.use('/api/faqs', faqsRoutes);

  // 404 & Centralized Error Handlers
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

