const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middlewares/auth');

// Middleware spécial admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Accès refusé' });
};

// Obtenir tous les utilisateurs
router.get('/users', auth, isAdmin, adminController.getAllUsers);

// Nombre total d’utilisateurs
router.get('/users/count', auth, isAdmin, adminController.getUserCount);

// Voir l’historique des changements
router.get('/users/history', auth, isAdmin, adminController.getUserHistory);

module.exports = router;
