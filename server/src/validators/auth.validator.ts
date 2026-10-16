import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Valid email is required.' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export const createAdminSchema = z.object({
  email: z
    .string()
    .email({ message: 'Valid email is required.' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Admin password must be at least 8 characters.' }),
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  role: z.enum(['ADMIN', 'EDITOR']).default('ADMIN'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateAdminInput = z.infer<typeof createAdminSchema>;

