import express from 'express';
import { getLeadAnalytics } from '../controllers/analytics.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/all', protect, getLeadAnalytics);

export default router;
