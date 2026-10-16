import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { prisma } from '../config/db.js';

export interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Check HTTP-only cookie first, fallback to Authorization header
    let token = req.cookies?.[config.sessionCookieName];

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.',
      });
      return;
    }

    const decoded = jwt.verify(token, config.jwtSecret) as { id: string; email: string };

    const user = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, fullName: true, role: true },
    });

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid session or user no longer exists.',
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Session expired or invalid token.',
    });
  }
}

