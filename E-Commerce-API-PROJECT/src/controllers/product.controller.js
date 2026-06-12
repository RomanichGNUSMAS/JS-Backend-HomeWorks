const { ProductService } = require("../services/product.service")

exports.ProductController = class {
    static async getAll(req, res, next) {
        try {
            const result = await ProductService.getAll();
            return res.json(result)
        } catch (err) { next(err) }
    }

    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await ProductService.getById(id);
            return res.json(result)
        } catch (err) { next(err) }
    }

    static async add(req, res, next) {
        try {
            const data = req.body;
            const result = await ProductService.addProduct(data);
            return res.status(201).json(result);
        } catch (err) { next(err) }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await ProductService.updateProduct(id, data);
            res.sendStatus(204);
        } catch (err) { next(err) }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await ProductService.deleteProduct(id);
            return res.json(result);
        } catch (err) { next(err) }
    }
}
