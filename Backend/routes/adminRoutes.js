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
router.post('/product',  verifyToken, isAdmin, adminController.addProduct);
router.put('/product/:id', verifyToken, isAdmin, adminController.updateProduct);
router.put('/product/:id/block', verifyToken, isAdmin, adminController.setProductBlocked);
router.put('/product/:id/stock', verifyToken, isAdmin, adminController.updateProductStock);
router.post('/category', verifyToken, isAdmin, adminController.addCategory);
router.post('/brand', verifyToken, isAdmin, adminController.addBrand);
router.get('/products', verifyToken, isAdmin, adminController.getAllProducts);
router.get('/category', verifyToken, isAdmin, adminController.getCategories);
router.get('/brand', verifyToken, isAdmin, adminController.getBrands);

module.exports = router;