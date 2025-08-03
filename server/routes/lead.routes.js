import express from 'express';
import {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} from '../controllers/lead.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/getlead', protect, getLeads);
router.get('/leadbyid/:id', protect, getLeadById);
router.post('/createlead', protect, createLead);
router.put('/updatelead/:id', protect, updateLead);
router.delete('/deletelead/:id', protect, deleteLead);

export default router;
