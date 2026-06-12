const { CategoryService } = require("../services/category.service")

exports.CategoryController = class {
    static async get(req,res,next) {
        try {
            const result = await CategoryService.getAll();
            return res.json(result);
        } catch (err) { next(err) }
    }

    static async add(req,res,next) {
        try {
            const data = req.body;
            const result = await CategoryService.createNew(data);
            return res.status(201).json(result);
        } catch (err) { next(err) }
    }

    static async del(req,res,next) {
        try {
            const { id } = req.params;
            const result = await CategoryService.deleteCategory(id);
            return res.json(result);
        } catch (err) { next(err) }
    }
}