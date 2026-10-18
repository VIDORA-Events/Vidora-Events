import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { portfolioProjectSchema } from '../validators/portfolio.validator.js';

// Public: Get published portfolio projects
export async function getPortfolioProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, featured } = req.query;

    const where: any = { isPublished: true };

    if (category && typeof category === 'string' && category !== 'All') {
      where.category = { equals: category, mode: 'insensitive' };
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const projects = await prisma.portfolioProject.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    res.status(200).json({
      success: true,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
}

// Public: Get project by slug
export async function getPortfolioProjectBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;

    const project = await prisma.portfolioProject.findUnique({
      where: { slug },
    });

    if (!project || !project.isPublished) {
      res.status(404).json({
        success: false,
        message: 'Portfolio project not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { project },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Get all projects (including unpublished)
export async function getAllProjectsAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    res.status(200).json({
      success: true,
      data: { projects },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Create new project
export async function createPortfolioProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = portfolioProjectSchema.parse(req.body);

    const project = await prisma.portfolioProject.create({
      data: validatedData as any,
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully.',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Update project
export async function updatePortfolioProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const validatedData = portfolioProjectSchema.partial().parse(req.body);

    const project = await prisma.portfolioProject.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio project updated successfully.',
      data: { project },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Delete project
export async function deletePortfolioProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.portfolioProject.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}

