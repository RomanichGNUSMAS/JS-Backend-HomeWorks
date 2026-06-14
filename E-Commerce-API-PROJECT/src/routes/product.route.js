const { ProductController } = require('../controllers/product.controller');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { ProductMiddleware } = require('../middlewares/product.middleware');
const { reviewRouter } = require('./review.route');

const productRouter = require('express').Router();

productRouter.get('/',ProductController.getAll)
productRouter.get('/:id',ProductMiddleware.checkId,ProductController.getById)
productRouter.post('/',AuthMiddleware.isAdmin,ProductMiddleware.addFields,ProductController.add)
productRouter.put('/:id',AuthMiddleware.isAdmin,ProductMiddleware.checkId,ProductMiddleware.updateFields,ProductController.update)
productRouter.delete('/:id',AuthMiddleware.isAdmin,ProductMiddleware.checkId,ProductController.delete);
productRouter.use('/:productId/reviews',reviewRouter)

exports.productRouter = productRouter;