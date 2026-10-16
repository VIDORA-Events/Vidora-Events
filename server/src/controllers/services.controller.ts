import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';

// Public: Get all active services
export async function getServices(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: { services },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Get all services
export async function getAllServicesAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const services = await prisma.service.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: { services },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Update service description or details
export async function updateService(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { title, subtitle, description, highlights, imageUrl, isActive, sortOrder } = req.body;

    const updated = await prisma.service.update({
      where: { id },
      data: {
        title,
        subtitle,
        description,
        highlights,
        imageUrl,
        isActive,
        sortOrder,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Service updated successfully.',
      data: { service: updated },
    });
  } catch (error) {
    next(error);
  }
}

