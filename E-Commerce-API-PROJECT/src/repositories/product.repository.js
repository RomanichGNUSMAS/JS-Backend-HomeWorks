const { prisma } = require("../configs/db");
const { cleanProduct } = require("../utils/clearObject");

exports.ProductRepository = class {
    static async getAllProducts() {
        const result = await prisma.product.findMany()
        return result;
    }

    static async getProductById(id) {
        const result = await prisma.product.findFirst({
            where: { id }
        })
        return !result ? null : result;
    }

    static async addProduct(rawData) {
        const clearObj = cleanProduct(rawData);
        const result = await prisma.product.create({ data: clearObj });
        return !result ? null : result;
    }

    static async updateProductById(id,rawData) {
        const clearObj = cleanProduct(rawData);
        const result = await prisma.product.updateMany({
            where : { id },
            data : rawData
        })
        return result.count == 0 ? null : true;
    }

    static async deleteProductById(id) {
        const result = await prisma.product.delete({
            where : { id }
        })
        return !result ? null : result;
    } 
}