import User from '../models/user.model.js';
import { generateToken } from '../utils/token.util.js';

export const signupUser = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = await User.create({ fullName, email, password });

    res.status(201).json({
      message: 'User registered successfully',
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getUserProfile = async (req, res) => {
  try {
    const user = req.user; // already set by protect middleware

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      state: user.state,
      zipCode: user.zipCode,
      bio: user.bio,
      jobTitle: user.jobTitle,
      department: user.department,
      manager: user.manager,
      officeLocation: user.officeLocation,
      skills:user.skills,
      professionalExperience: user.professionalExperience,
      joined: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


export const updateUserProfile = async (req, res, next) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Auth middleware
export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

