const Product = require('../models/product');

class ProductDAO {
    async getAll() {
        return await Product.find();
    }

    async getPaginated({ limit, page, sort, query }) {
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        const filter = {};
        if (query) {
            if (['available', 'not available'].includes(query)) {
                filter.status = query;
            } else {
                filter.category = query;
            }
        }

        const sortOption = {};
        if (sort === 'asc') sortOption.price = 1;
        if (sort === 'desc') sortOption.price = -1;

        const skip = (parsedPage - 1) * parsedLimit;

        const [products, totalDocs] = await Promise.all([
            Product.find(filter).sort(sortOption).skip(skip).limit(parsedLimit).lean(),
            Product.countDocuments(filter)
        ]);

        const totalPages = Math.ceil(totalDocs / parsedLimit);
        const hasPrevPage = parsedPage > 1;
        const hasNextPage = parsedPage < totalPages;

        return {
            docs: products,
            totalDocs,
            limit: parsedLimit,
            totalPages,
            page: parsedPage,
            hasPrevPage,
            hasNextPage,
            prevPage: hasPrevPage ? parsedPage - 1 : null,
            nextPage: hasNextPage ? parsedPage + 1 : null
        };
    }

    async getById(id) {
        return await Product.findById(id).lean();
    }

    async create(productData) {
        return await Product.create(productData);
    }

    async update(id, productData) {
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

module.exports = new ProductDAO();
