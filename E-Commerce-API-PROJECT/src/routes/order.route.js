const { OrderController } = require('../controllers/order.controller');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { OrderMiddleware } = require('../middlewares/order.middleware');

const orderRouter = require('express').Router();

orderRouter.get('/',OrderController.getWithRole)
orderRouter.get('/:id',OrderController.get)
orderRouter.post('/checkout',OrderMiddleware.addFields,OrderController.checkout)
orderRouter.patch('/:id/status', AuthMiddleware.isAdmin, OrderController.update)

exports.orderRouter = orderRouter