import { Router } from 'express';
import { getServices, getAllServicesAdmin, updateService } from '../controllers/services.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Public
router.get('/', getServices);

// Protected Admin
router.get('/admin/all', requireAuth, getAllServicesAdmin);
router.patch('/:id', requireAuth, updateService);

export default router;

