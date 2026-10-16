import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { config } from '../config/index.js';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  // Safe logging that excludes passwords, credentials, session secrets
  const sanitizedBody = { ...req.body };
  if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
  if (sanitizedBody.token) sanitizedBody.token = '[REDACTED]';

  console.error(`[API Error] ${req.method} ${req.url}:`, {
    message: err.message,
    name: err.name,
    stack: config.isProduction ? undefined : err.stack,
    body: sanitizedBody,
  });

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      message: 'Validation failed. Please verify your submitted information.',
      errors: formattedErrors,
    });
    return;
  }

  // Handle Prisma known request errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (err.code === 'P2002') {
      const target = (err.meta?.target as string[])?.join(', ') || 'field';
      res.status(409).json({
        success: false,
        message: `A record with this ${target} already exists.`,
      });
      return;
    }

    // Record not found
    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'The requested record could not be found.',
      });
      return;
    }
  }

  // Generic sanitized fallback
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: config.isProduction
      ? 'An unexpected error occurred while processing your request. Please try again later.'
      : err.message || 'Internal server error',
  });
}

