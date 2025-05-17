const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const auth = require('../middlewares/auth');
const { body } = require('express-validator');

// Récupérer infos du profil
router.get('/', auth, profileController.getProfile);

// Modifier nom d’utilisateur
router.put(
  '/username',
  [auth, body('username').notEmpty()],
  profileController.updateUsername
);

// Modifier email (avec vérification)
router.put(
  '/email',
  [auth, body('email').isEmail()],
  profileController.updateEmail
);

// Confirmer email modifié
router.post('/email/confirm', auth, profileController.confirmEmail);

// Modifier téléphone (avec vérification)
router.put(
  '/phone',
  [auth, body('phone').isMobilePhone()],
  profileController.updatePhone
);

// Confirmer téléphone modifié
router.post('/phone/confirm', auth, profileController.confirmPhone);

module.exports = router;
