import { z } from 'zod';

export const createInquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name cannot exceed 100 characters.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please provide a valid email address.' })
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(30, { message: 'Phone number cannot exceed 30 characters.' })
    .optional()
    .or(z.literal('')),
  eventType: z
    .string()
    .min(2, { message: 'Please select an event type.' }),
  preferredDate: z
    .string()
    .optional()
    .or(z.literal('')),
  flexibleDate: z.boolean().default(false),
  location: z
    .string()
    .max(120, { message: 'Location cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')),
  guestCount: z
    .number()
    .int()
    .positive({ message: 'Guest count must be at least 1.' })
    .optional()
    .nullable()
    .or(z.literal('')),
  minBudget: z
    .string()
    .max(80, { message: 'Minimum budget cannot exceed 80 characters.' })
    .optional()
    .or(z.literal('')),
  maxBudget: z
    .string()
    .max(80, { message: 'Maximum budget cannot exceed 80 characters.' })
    .optional()
    .or(z.literal('')),
  budgetRange: z
    .string()
    .max(120, { message: 'Budget range cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')),
  preferredContact: z
    .enum(['email', 'phone'])
    .default('email'),
  vision: z
    .string()
    .min(10, { message: 'Please share a few sentences about your event vision (at least 10 characters).' })
    .max(3000, { message: 'Vision cannot exceed 3000 characters.' })
    .trim(),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'IN_DISCUSSION', 'CONFIRMED', 'CLOSED']),
});

export const createInquiryNoteSchema = z.object({
  content: z
    .string()
    .min(2, { message: 'Note must be at least 2 characters.' })
    .max(2000, { message: 'Note cannot exceed 2000 characters.' })
    .trim(),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
export type UpdateInquiryStatusInput = z.infer<typeof updateInquiryStatusSchema>;
export type CreateInquiryNoteInput = z.infer<typeof createInquiryNoteSchema>;

