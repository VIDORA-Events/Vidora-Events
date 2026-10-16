import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  getInquiryById,
  updateInquiryStatus,
  addInquiryNote,
  getInquiryStats,
} from '../controllers/inquiries.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { inquiryLimiter } from '../middleware/rate-limit.middleware.js';

const router = Router();

// Public inquiry submission (rate-limited)
router.post('/', inquiryLimiter, createInquiry);

// Protected admin endpoints
router.get('/', requireAuth, getInquiries);
router.get('/stats', requireAuth, getInquiryStats);
router.get('/:id', requireAuth, getInquiryById);
router.patch('/:id', requireAuth, updateInquiryStatus);
router.post('/:id/notes', requireAuth, addInquiryNote);

export default router;

