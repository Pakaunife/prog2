// filepath: Backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controller/adminController');

router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/orders/:userId', verifyToken, isAdmin, adminController.getOrdersByUser);
router.put('/block/:userId', verifyToken, isAdmin, adminController.blockUser);
router.put('/unblock/:userId', verifyToken, isAdmin, adminController.unblockUser);
router.put('/set-admin/:userId', verifyToken, isAdmin, adminController.setAdmin);
router.put('/orders/:orderId/stato', verifyToken, isAdmin, adminController.aggiornaStatoOrdine);
router.delete('/users/:userId', verifyToken, isAdmin, adminController.rimuoviUtente);

module.exports = router;