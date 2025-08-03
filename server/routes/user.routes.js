import express from 'express';
import { signupUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/user.controller.js';
import protect from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/update', protect, updateUserProfile);
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;
