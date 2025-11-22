const Cart = require('../models/cart');

class CartDAO {
    async create() {
        return await Cart.create({ products: [] });
    }

    async getById(id) {
        return await Cart.findById(id).populate('products.product');
    }

    async save(cart) {
        return await cart.save();
    }

    async update(id, products) {
        return await Cart.findByIdAndUpdate(id, { products }, { new: true });
    }
}

module.exports = new CartDAO();
