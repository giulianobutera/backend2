const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');
const passport = require('passport');
const authorization = require('../middlewares/auth.middleware');

// Ruta POST /api/carts
// Crea un nuevo carrito vacío
router.post('/', cartController.createCart);

// Ruta GET /api/carts/:cid
// Busca un carrito por su ID
router.get('/:cid', cartController.getCartById);

// Ruta POST /api/carts/:cid/product/:pid
// Agrega un producto (por su ID) a un carrito específico (por su ID)
router.post('/:cid/product/:pid', passport.authenticate('jwt', { session: false }), authorization('user'), cartController.addProductToCart);

// Ruta DELETE /api/carts/:cid/products/:pid
// Elimina un producto específico del carrito
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);

// Ruta PUT /api/carts/:cid 
// Reemplaza todos los productos del carrito
router.put('/:cid', cartController.updateCart);

// Ruta PUT /api/carts/:cid/products/:pid 
// Actualiza cantidad de producto
router.put('/:cid/products/:pid', cartController.updateProductQuantity);

// Ruta DELETE /api/carts/:cid 
// Elimina todos los productos del carrito
router.delete('/:cid', cartController.clearCart);

// Ruta POST /api/carts/:cid/purchase
// Finaliza el proceso de compra
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), cartController.purchaseCart);

module.exports = router;