import express from 'express';
import userRoutes from './user.routes.js';
import leadRoutes from './lead.routes.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/lead', leadRoutes);

export default router;
