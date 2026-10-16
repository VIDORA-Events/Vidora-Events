import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';

// Public: Get all published FAQs
export async function getFaqs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const faqs = await prisma.faq.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    res.status(200).json({
      success: true,
      data: { faqs },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Get all FAQs
export async function getAllFaqsAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    res.status(200).json({
      success: true,
      data: { faqs },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Create FAQ
export async function createFaq(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, question, answer, sortOrder, isPublished } = req.body;

    const faq = await prisma.faq.create({
      data: {
        category,
        question,
        answer,
        sortOrder: sortOrder || 0,
        isPublished: isPublished ?? true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'FAQ entry created.',
      data: { faq },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Update FAQ
export async function updateFaq(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { category, question, answer, sortOrder, isPublished } = req.body;

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        category,
        question,
        answer,
        sortOrder,
        isPublished,
      },
    });

    res.status(200).json({
      success: true,
      message: 'FAQ entry updated.',
      data: { faq },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Delete FAQ
export async function deleteFaq(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    await prisma.faq.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'FAQ entry deleted.',
    });
  } catch (error) {
    next(error);
  }
}

