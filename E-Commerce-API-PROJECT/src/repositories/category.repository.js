const { prisma } = require("../configs/db");
const { cleanCategory } = require("../utils/clearObject");

exports.CategoryRepository = class {
    static async getAllCategories() {
        const result = await prisma.category.findMany();
        return result;
    }

    static async addNewCategory(rawData) {
        const found = await prisma.category.findUnique({
            where : { name:rawData.name }
        })
        if(found) return null;
        const result = await prisma.category.create({
            data : {
                ...cleanCategory(rawData)
            }
        })
        return result;
    }

    static async deleteCategory(id) {
        const found = await prisma.category.findUnique({
            where : { id }
        })
        if(!found) return null;
        return await prisma.category.delete({
            where : { id }
        })
    }
}