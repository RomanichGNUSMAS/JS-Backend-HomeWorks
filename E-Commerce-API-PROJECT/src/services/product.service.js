const { ProductRepository } = require("../repositories/product.repository")

exports.ProductService = class {
    static async getAll() {
        return await ProductRepository.getAllProducts();
    }

    static async getById(id) {
        const result = await ProductRepository.getProductById(id);
        if(!result)
            throw new Error('product not found');
        return result;
    }

    static async addProduct(rawData) {
        const result = await ProductRepository.addProduct(rawData);
        if(!result) throw new Error('something went error');
        return result;
    }

    static async updateProduct(id,rawData) {
        const result = await ProductRepository.updateProductById(+id,rawData);
        if(!result) throw new Error('product not found');
        return true;
    }

    static async deleteProduct(id) {
        const result = await ProductRepository.deleteProductById(+id);
        if(!result) throw new Error('product not found');
        return result;
    }
}