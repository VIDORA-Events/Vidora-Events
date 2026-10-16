import { z } from 'zod';

export const portfolioProjectSchema = z.object({
  title: z.string().min(2).max(150),
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  category: z.string().min(2).max(60),
  location: z.string().min(2).max(100),
  date: z.string().optional(),
  guestCount: z.number().int().positive().optional().nullable(),
  shortDesc: z.string().min(5).max(300),
  fullDesc: z.string().min(10).max(5000),
  coverImage: z.string().url('Cover image must be a valid URL'),
  galleryImages: z.array(z.string().url()).default([]),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type PortfolioProjectInput = z.infer<typeof portfolioProjectSchema>;

