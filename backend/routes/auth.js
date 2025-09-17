import { Router } from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = Router();

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (error?.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error: error.message });
    }
    if (error?.code === 11000) {
      return res.status(400).json({ message: 'Duplicate key error', error: error.message });
    }
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Passport auth error:', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    if (!user) {
      console.log('Login failed:', info?.message);
      return res.status(401).json({ message: info?.message || 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Session login error:', err);
        return res.status(500).json({ message: 'Server error', error: err.message });
      }
      res.json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
    });
  })(req, res, next);
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    res.json({ message: 'Logout successful' });
  });
});

// Check authentication status
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: { id: req.user.id, name: req.user.name, email: req.user.email } });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

export default router;
