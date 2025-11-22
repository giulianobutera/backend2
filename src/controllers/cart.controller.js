const cartService = require('../services/cart.service');

class CartController {
    async createCart(req, res) {
        try {
            const newCart = await cartService.createCart();
            res.status(201).json(newCart);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear carrito' });
        }
    }

    async getCartById(req, res) {
        try {
            const cart = await cartService.getCartById(req.params.cid);
            cart
                ? res.json(cart)
                : res.status(404).json({ error: 'Carrito no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'ID de carrito inválido' });
        }
    }

    async addProductToCart(req, res) {
        try {
            const updatedCart = await cartService.addProductToCart(req.params.cid, req.params.pid);
            updatedCart
                ? res.json(updatedCart)
                : res.status(404).json({ error: 'Carrito o producto no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'Error al agregar producto al carrito' });
        }
    }

    async removeProductFromCart(req, res) {
        try {
            const result = await cartService.removeProductFromCart(req.params.cid, req.params.pid);
            result
                ? res.json(result)
                : res.status(404).json({ error: 'Carrito o producto no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'Error al eliminar producto del carrito' });
        }
    }

    async updateCart(req, res) {
        try {
            const result = await cartService.updateCart(req.params.cid, req.body.products);
            result
                ? res.json(result)
                : res.status(404).json({ error: 'Carrito no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'Error al actualizar el carrito' });
        }
    }

    async updateProductQuantity(req, res) {
        try {
            const { quantity } = req.body;
            const result = await cartService.updateProductQuantity(req.params.cid, req.params.pid, quantity);
            result
                ? res.json(result)
                : res.status(404).json({ error: 'Carrito o producto no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'Error al actualizar cantidad del producto' });
        }
    }

    async clearCart(req, res) {
        try {
            const result = await cartService.clearCart(req.params.cid);
            result
                ? res.json(result)
                : res.status(404).json({ error: 'Carrito no encontrado' });
        } catch (err) {
            res.status(400).json({ error: 'Error al vaciar el carrito' });
        }
    }

    async purchaseCart(req, res) {
        try {
            const { cid } = req.params;
            const userEmail = req.user.email;
            const result = await cartService.purchaseCart(cid, userEmail);
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}

module.exports = new CartController();
