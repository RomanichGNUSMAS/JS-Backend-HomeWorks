const { CartController } = require('../controllers/cart.controller');
const { CartMiddleware } = require('../middlewares/cart.middleware');

const cartRouter = require('express').Router();

cartRouter.get('/',CartMiddleware.checkToken,CartController.get)
cartRouter.post('/items',CartMiddleware.addFields,CartMiddleware.checkToken,CartController.add)
cartRouter.put('/items/:id',CartMiddleware.updateFields,CartController.update)
cartRouter.delete('/items/:id',CartController.del)

exports.cartRouter = cartRouter;