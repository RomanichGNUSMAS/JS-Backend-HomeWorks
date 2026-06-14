const { ReviewService } = require("../services/review.service");

exports.ReviewController = class {
    static async get(req, res, next) {
        try {
            const { productId } = req.params;
            const result = await ReviewService.getAllReviewsOfProduct(productId);
            return res.json(result);
        } catch (err) { next(err) }
    }

    static async add(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { productId } = req.params;
            const result = await ReviewService.addRewiev(token, productId, req.body);
            return res.status(201).json(result);
        } catch (err) { next(err) }
    }

    static async remove(req,res,next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { id } = req.params;
            const result = await ReviewService.remove(token,id);
            return res.json(result)
        } catch (err) { next(err) }
    }
}