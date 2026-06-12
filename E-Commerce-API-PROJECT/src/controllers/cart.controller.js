const { CartService } = require("../services/cart.service");

exports.CartController = class {
    static async get(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await CartService.getUserCart(token);
            return res.json(result);
        } catch (err) { next(err) }
    }

    static async add(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await CartService.addToCart(req.body,token);
            return res.status(201).json(result);
        } catch (err) { next(err) }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const result = await CartService.updateQuantity(req.body?.quantity,+id)
            return res.sendStatus(204)
        } catch (err) { next(err) }
    }

    static async del(req,res,next) {
        try {
            const { id } = req.params;
            const result = await CartService.removeProduct(+id)
            return res.json(result)
        } catch (err) { next(err) }
    }
}