const productService = require('../services/product.service');

class ProductController {
    async getProducts(req, res) {
        try {
            const { page = 1, limit = 10, sort, query } = req.query;
            const result = await productService.getPaginatedProducts({ page, limit, sort, query });
            res.json(result);
        } catch (err) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.pid);
            product
                ? res.json(product)
                : res.status(404).json({ error: 'Producto no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'ID inválido' });
        }
    }

    async createProduct(req, res) {
        try {
            const newProduct = await productService.addProduct(req.body);
            res.status(201).json(newProduct);
        } catch (err) {
            res.status(400).json({ error: 'Error al crear producto', details: err.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const updated = await productService.updateProduct(req.params.pid, req.body);
            updated
                ? res.json(updated)
                : res.status(404).json({ error: 'Producto no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'ID inválido o datos incorrectos' });
        }
    }

    async deleteProduct(req, res) {
        try {
            const deleted = await productService.deleteProduct(req.params.pid);
            deleted
                ? res.json({ message: 'Producto eliminado', id: deleted._id })
                : res.status(404).json({ error: 'Producto no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'ID inválido' });
        }
    }
}

module.exports = new ProductController();
