import express from 'express';
import { filterDeals } from '../controllers/pipeline.controller.js';

const router = express.Router();

router.get('/filter', filterDeals);

export default router;