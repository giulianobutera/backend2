const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const passport = require('passport');
const authorization = require('../middlewares/auth.middleware');

// Ruta GET /api/products
router.get('/', productController.getProducts);

// Ruta GET /api/products/:pid
router.get('/:pid', productController.getProductById);

// Ruta POST /api/products
router.post('/', passport.authenticate('jwt', { session: false }), authorization('admin'), productController.createProduct);

// Ruta PUT /api/products/:pid
router.put('/:pid', passport.authenticate('jwt', { session: false }), authorization('admin'), productController.updateProduct);

// Ruta DELETE /api/products/:pid
router.delete('/:pid', passport.authenticate('jwt', { session: false }), authorization('admin'), productController.deleteProduct);

module.exports = router;