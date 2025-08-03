import express from 'express';
import userRoutes from './user.routes.js';
import leadRoutes from './lead.routes.js';
import aiRoutes from './ai.routes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/lead', leadRoutes);
router.use('/ai', aiRoutes);

export default router;
