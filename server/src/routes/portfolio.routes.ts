import { Router } from 'express';
import {
  getPortfolioProjects,
  getPortfolioProjectBySlug,
  getAllProjectsAdmin,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
} from '../controllers/portfolio.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

// Public endpoints
router.get('/', getPortfolioProjects);
router.get('/:slug', getPortfolioProjectBySlug);

// Protected admin endpoints
router.get('/admin/all', requireAuth, getAllProjectsAdmin);
router.post('/', requireAuth, createPortfolioProject);
router.patch('/:id', requireAuth, updatePortfolioProject);
router.delete('/:id', requireAuth, deletePortfolioProject);

export default router;

