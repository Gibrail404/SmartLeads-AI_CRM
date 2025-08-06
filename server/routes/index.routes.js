import express from 'express';
import userRoutes from './user.routes.js';
import leadRoutes from './lead.routes.js';
import aiRoutes from './ai.routes.js';
import insightsRoutes from './insights.routes.js';
import analyticsRoutes from './analytics.routes.js';
import pipelineRoutes from './pipeline.routes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/lead', leadRoutes);
router.use('/ai', aiRoutes);
router.use('/insights', insightsRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/pipeline', pipelineRoutes);

export default router;
