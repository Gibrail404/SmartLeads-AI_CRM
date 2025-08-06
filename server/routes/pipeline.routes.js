import express from 'express';
import { filterLeads } from '../controllers/pipeline.controller.js';

const router = express.Router();

router.get('/filter', filterLeads);

export default router;