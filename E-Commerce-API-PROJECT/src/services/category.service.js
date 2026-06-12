const { CategoryRepository } = require("../repositories/category.repository")

exports.CategoryService = class {
    static async getAll() {
        return await CategoryRepository.getAllCategories();
    }

    static async createNew(rawData) {
        const result = await CategoryRepository.addNewCategory(rawData);
        if(!result) throw new Error('this category already exists');
        return result;
    }

    static async deleteCategory(id) {
        const result = await CategoryRepository.deleteCategory(+id);
        if(!result) throw new Error('category not found');
        return result;
    }
}