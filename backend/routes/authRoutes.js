// backend/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const protect = require('../middlewares/auth');

const router = express.Router();
router.post(
  '/register',
 
  [
    body('name').not().isEmpty().withMessage('Le nom est requis.'),
    body('email').isEmail().withMessage('Email invalide.'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit avoir au moins 6 caractères.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
      }
      const newUser = new User({
        name,
        email,
        password
      });

      await newUser.save();

      // Generate JWT
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.status(201).json({ message: 'Utilisateur créé', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  }
);

// Login User
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email invalide.'),
    body('password').not().isEmpty().withMessage('Le mot de passe est requis.')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Utilisateur non trouvé' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      res.json({ message: 'Connexion réussie', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  }
);

// Get Current User (Protected route)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
});

// Logout (Just a placeholder for clearing client-side session, optional in JWT-based auth)
router.post('/logout', (req, res) => {
  // JWT doesn't have a logout mechanism, simply inform the user
  res.json({ message: 'Déconnexion réussie' });
});

module.exports = router;
