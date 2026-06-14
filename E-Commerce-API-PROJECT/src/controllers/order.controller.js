const { OrderService } = require("../services/order.service")

exports.OrderController = class {
    static async checkout(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await OrderService.orderCheckout(token)
            return res.status(201).json(result);
        } catch (err) { next(err) }
    }

    static async getWithRole(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await OrderService.getOrdersForSpecificRole(token, req.body.role);
            return res.json(result)
        } catch (err) { next(err) }
    }

    static async get(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await OrderService.getOrderItems(token);
            return res.json(result);
        } catch (err) { next(err) }
    }

    static async update(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await OrderService.changeStatus(token,req.body.status,req.params.id);
            return res.json(result)
        } catch (err) { next(err) }
    }
}