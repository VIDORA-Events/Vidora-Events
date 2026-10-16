import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import {
  createInquirySchema,
  updateInquiryStatusSchema,
  createInquiryNoteSchema,
} from '../validators/inquiry.validator.js';

// Public: Submit event inquiry
export async function createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const validatedData = createInquirySchema.parse(req.body);

    const guestCount =
      validatedData.guestCount !== undefined && validatedData.guestCount !== null && validatedData.guestCount !== ''
        ? Number(validatedData.guestCount)
        : null;

    let budgetRangeToSave = validatedData.budgetRange || null;
    if (!budgetRangeToSave && (validatedData.minBudget || validatedData.maxBudget)) {
      if (validatedData.minBudget && validatedData.maxBudget) {
        budgetRangeToSave = `${validatedData.minBudget} – ${validatedData.maxBudget}`;
      } else if (validatedData.minBudget) {
        budgetRangeToSave = `From ${validatedData.minBudget} (Flexible Max)`;
      } else if (validatedData.maxBudget) {
        budgetRangeToSave = `Up to ${validatedData.maxBudget}`;
      }
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone || null,
        eventType: validatedData.eventType,
        preferredDate: validatedData.preferredDate || null,
        flexibleDate: Boolean(validatedData.flexibleDate),
        location: validatedData.location || null,
        guestCount: guestCount,
        budgetRange: budgetRangeToSave,
        preferredContact: validatedData.preferredContact,
        vision: validatedData.vision,
        status: 'NEW',
      },
      select: {
        id: true,
        fullName: true,
        eventType: true,
        createdAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your inquiry. An Atelier director will review your vision and reach out within 24 to 48 hours.',
      data: {
        inquiryId: inquiry.id,
        fullName: inquiry.fullName,
        eventType: inquiry.eventType,
        receivedAt: inquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Get all inquiries with search, filter, and pagination
export async function getInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string, 10) || 10));
    const skip = (page - 1) * limit;

    const status = req.query.status as any;
    const search = (req.query.search as string)?.trim();

    const where: any = {};

    if (status && ['NEW', 'CONTACTED', 'IN_DISCUSSION', 'CONFIRMED', 'CLOSED'].includes(status)) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
        { eventType: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [total, inquiries] = await Promise.all([
      prisma.inquiry.count({ where }),
      prisma.inquiry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { internalNotes: true },
          },
        },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        inquiries,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Get inquiry detail with internal notes
export async function getInquiryById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        internalNotes: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!inquiry) {
      res.status(404).json({
        success: false,
        message: 'Inquiry record not found.',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { inquiry },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Update inquiry status
export async function updateInquiryStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = updateInquiryStatusSchema.parse(req.body);

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status },
    });

    res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
      data: { inquiry: updated },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Add internal note to inquiry
export async function addInquiryNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { content } = createInquiryNoteSchema.parse(req.body);

    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) {
      res.status(404).json({
        success: false,
        message: 'Inquiry record not found.',
      });
      return;
    }

    const note = await prisma.inquiryNote.create({
      data: {
        inquiryId: id,
        authorId: req.user?.id || null,
        authorName: req.user?.fullName || 'Atelier Staff',
        content,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Internal note added.',
      data: { note },
    });
  } catch (error) {
    next(error);
  }
}

// Admin: Inquiry overview statistics
export async function getInquiryStats(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const [total, newCount, contactedCount, inDiscussionCount, confirmedCount, closedCount] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
      prisma.inquiry.count({ where: { status: 'CONTACTED' } }),
      prisma.inquiry.count({ where: { status: 'IN_DISCUSSION' } }),
      prisma.inquiry.count({ where: { status: 'CONFIRMED' } }),
      prisma.inquiry.count({ where: { status: 'CLOSED' } }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          total,
          new: newCount,
          contacted: contactedCount,
          inDiscussion: inDiscussionCount,
          confirmed: confirmedCount,
          closed: closedCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
}

