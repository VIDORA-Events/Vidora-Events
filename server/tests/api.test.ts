import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { prisma } from '../src/config/db.js';
import jwt from 'jsonwebtoken';
import { config } from '../src/config/index.js';

// Mock prisma for isolated API testing
vi.mock('../src/config/db.js', () => {
  return {
    prisma: {
      inquiry: {
        create: vi.fn(),
        findMany: vi.fn(),
        findUnique: vi.fn(),
        update: vi.fn(),
        count: vi.fn(),
      },
      inquiryNote: {
        create: vi.fn(),
      },
      adminUser: {
        findUnique: vi.fn(),
        create: vi.fn(),
      },
      portfolioProject: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      service: {
        findMany: vi.fn(),
        update: vi.fn(),
      },
      faq: {
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
      $connect: vi.fn(),
      $disconnect: vi.fn(),
    },
    connectDatabase: vi.fn(),
  };
});

describe('VIDORA Events Sri Lanka — API Endpoints & Security Tests', () => {
  const app = createApp();

  describe('GET /api/health', () => {
    it('returns healthy status and brand identity', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.brand).toBe('VIDORA EVENTS SRI LANKA');
      expect(res.body.status).toBe('healthy');
    });
  });

  describe('POST /api/inquiries (Public Submission & Validation)', () => {
    it('rejects inquiry with invalid email and too short vision', async () => {
      const res = await request(app)
        .post('/api/inquiries')
        .send({
          fullName: 'J',
          email: 'not-an-email',
          eventType: 'Weddings',
          vision: 'Short',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
      expect(res.body.errors.some((e: any) => e.field === 'fullName')).toBe(true);
      expect(res.body.errors.some((e: any) => e.field === 'email')).toBe(true);
      expect(res.body.errors.some((e: any) => e.field === 'vision')).toBe(true);
    });

    it('successfully processes valid inquiry submission and stores in database', async () => {
      const mockInquiry = {
        id: 'inq-12345',
        fullName: 'Genevieve Dupond',
        email: 'genevieve@example.com',
        eventType: 'Weddings & Engagements',
        createdAt: new Date().toISOString(),
      };

      (prisma.inquiry.create as any).mockResolvedValue(mockInquiry);

      const res = await request(app)
        .post('/api/inquiries')
        .send({
          fullName: 'Genevieve Dupond',
          email: 'genevieve@example.com',
          phone: '+33 6 12 34 56 78',
          eventType: 'Weddings & Engagements',
          preferredDate: '2025-09-20',
          flexibleDate: true,
          location: 'Lake Como, Italy',
          guestCount: 120,
          budgetRange: '$100k-$250k',
          preferredContact: 'email',
          vision: 'A three-day candlelit neoclassical gathering with couture floristry and Lake Como private Riva transfers.',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.inquiryId).toBe('inq-12345');
      expect(res.body.data.fullName).toBe('Genevieve Dupond');
    });
  });

  describe('Protected Admin Route Authorization', () => {
    it('blocks unauthenticated access to GET /api/inquiries with 401', async () => {
      const res = await request(app).get('/api/inquiries');
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('Authentication required');
    });

    it('allows access to GET /api/inquiries when valid token cookie is provided', async () => {
      const mockAdmin = {
        id: 'admin-001',
        email: 'founder@vidoraevents.lk',
        fullName: 'Claire de Valois',
        role: 'ADMIN',
      };

      (prisma.adminUser.findUnique as any).mockResolvedValue(mockAdmin);
      (prisma.inquiry.count as any).mockResolvedValue(1);
      (prisma.inquiry.findMany as any).mockResolvedValue([
        {
          id: 'inq-12345',
          fullName: 'Genevieve Dupond',
          email: 'genevieve@example.com',
          eventType: 'Weddings & Engagements',
          status: 'NEW',
          createdAt: new Date(),
          _count: { internalNotes: 0 },
        },
      ]);

      const token = jwt.sign(
        { id: mockAdmin.id, email: mockAdmin.email, role: mockAdmin.role },
        config.jwtSecret,
        { expiresIn: '1h' }
      );

      const res = await request(app)
        .get('/api/inquiries')
        .set('Cookie', [`${config.sessionCookieName}=${token}`]);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.inquiries).toHaveLength(1);
      expect(res.body.data.pagination.total).toBe(1);
    });

    it('updates inquiry status when authorized', async () => {
      const mockAdmin = {
        id: 'admin-001',
        email: 'founder@vidoraevents.lk',
        fullName: 'Claire de Valois',
        role: 'ADMIN',
      };

      (prisma.adminUser.findUnique as any).mockResolvedValue(mockAdmin);
      (prisma.inquiry.update as any).mockResolvedValue({
        id: 'inq-12345',
        status: 'IN_DISCUSSION',
      });

      const token = jwt.sign({ id: mockAdmin.id, email: mockAdmin.email }, config.jwtSecret);

      const res = await request(app)
        .patch('/api/inquiries/inq-12345')
        .set('Cookie', [`${config.sessionCookieName}=${token}`])
        .send({ status: 'IN_DISCUSSION' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.inquiry.status).toBe('IN_DISCUSSION');
    });
  });

  describe('GET /api/portfolio (Public Gallery)', () => {
    it('returns public published portfolio projects', async () => {
      (prisma.portfolioProject.findMany as any).mockResolvedValue([
        {
          id: 'proj-1',
          slug: 'villa-balbiano-lake-como',
          title: 'Villa Balbiano',
          category: 'Weddings',
          coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552',
          isPublished: true,
        },
      ]);

      const res = await request(app).get('/api/portfolio');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.projects).toHaveLength(1);
    });
  });
});

