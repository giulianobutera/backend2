const productDAO = require('../dao/product.dao');

class ProductService {
    async getProducts() {
        return await productDAO.getAll();
    }

    async getPaginatedProducts(params) {
        return await productDAO.getPaginated(params);
    }

    async getProductById(id) {
        return await productDAO.getById(id);
    }

    async addProduct(productData) {
        return await productDAO.create(productData);
    }

    async updateProduct(id, productData) {
        return await productDAO.update(id, productData);
    }

    async deleteProduct(id) {
        return await productDAO.delete(id);
    }
}

module.exports = new ProductService();
