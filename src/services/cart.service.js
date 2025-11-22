const cartDAO = require('../dao/cart.dao');
const productDAO = require('../dao/product.dao');
const ticketDAO = require('../dao/ticket.dao');

class CartService {
    async createCart() {
        return await cartDAO.create();
    }

    async getCartById(id) {
        return await cartDAO.getById(id);
    }

    async addProductToCart(cartId, productId) {
        return await cartDAO.addProduct(cartId, productId);
    }

    async removeProductFromCart(cartId, productId) {
        return await cartDAO.removeProduct(cartId, productId);
    }

    async updateCart(cartId, products) {
        return await cartDAO.update(cartId, products);
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await cartDAO.updateQuantity(cartId, productId, quantity);
    }

    async clearCart(cartId) {
        return await cartDAO.clear(cartId);
    }

    async purchaseCart(cartId, userEmail) {
        const cart = await cartDAO.getById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const productsToPurchase = [];
        const productsToKeep = [];
        let totalAmount = 0;

        for (const item of cart.products) {
            const product = await productDAO.getById(item.product._id);

            if (product && product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await productDAO.update(product._id, { stock: product.stock });
                totalAmount += product.price * item.quantity;
                productsToPurchase.push(item);
            } else {
                productsToKeep.push(item);
            }
        }

        if (productsToPurchase.length > 0) {
            await ticketDAO.create({
                amount: totalAmount,
                purchaser: userEmail
            });
        }

        // Actualizar el carrito solo con los productos que NO se pudieron comprar
        await cartDAO.update(cartId, productsToKeep);

        return {
            purchased: productsToPurchase,
            failed: productsToKeep.map(item => item.product._id)
        };
    }
}

module.exports = new CartService();
