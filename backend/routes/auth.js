const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');

// Signup avec validation
router.post(
  '/signup',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('username').notEmpty(),
    body('phone').isMobilePhone(),
  ],
  authController.signup
);

// Login
router.post('/login', authController.login);

// Envoi de lien ou code de vérification (email/téléphone)
router.post('/verify', authController.sendVerification);

// Vérification de code reçu
router.post('/verify/confirm', authController.confirmVerification);

// Mot de passe oublié
router.post('/forgot-password', authController.forgotPassword);

// Réinitialisation du mot de passe
router.post('/reset-password', authController.resetPassword);

module.exports = router;
