const express = require('express');
const router = express.Router();
const ProductService = require('../services/product.service');

// Ruta GET /
// Renderiza la vista home con todos los productos actuales, con paginación y permitiendo querys
router.get('/', async (req, res) => {
  const { page = 1, limit = 10, sort, query } = req.query;
  const result = await ProductService.getPaginatedProducts({ page, limit, sort, query });
  res.render('home', result);
});

router.get('/products/:pid', async (req, res) => {
  const product = await ProductService.getProductById(req.params.pid);
  if (product) {
    res.render('productDetails', { product });
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta GET /realtimeproducts
// Renderiza la vista en tiempo real, con WebSocket
router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

module.exports = router;
