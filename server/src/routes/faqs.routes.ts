import { Router } from 'express';
import {
  getFaqs,
  getAllFaqsAdmin,
  createFaq,
  updateFaq,
  deleteFaq,
} from '../controllers/faqs.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/', getFaqs);

// Protected Admin
router.get('/admin/all', requireAuth, getAllFaqsAdmin);
router.post('/', requireAuth, createFaq);
router.patch('/:id', requireAuth, updateFaq);
router.delete('/:id', requireAuth, deleteFaq);

export default router;

