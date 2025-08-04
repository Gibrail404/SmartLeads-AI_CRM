import express from 'express';
import protect from '../middlewares/auth.middleware.js';
import { kpiMetrics, revenueForecast, detectAnomalies,recommendActions } from '../controllers/insights.controller.js';

const router = express.Router();

router.get('/kpimetrics', protect, kpiMetrics);
router.get('/revenueforecast', protect, revenueForecast); 
// router.get('/leadscoring', protect, leadScoring);
router.get('/anomalies', protect, detectAnomalies);
router.get('/recommendations', protect, recommendActions);


export default router;