const { CategoryController } = require('../controllers/category.controller');
const { AuthMiddleware } = require('../middlewares/auth.middleware');
const { CategoryMiddleware } = require('../middlewares/category.middleware');

const categoryRouter = require('express').Router();

categoryRouter.get('/',CategoryController.get)
categoryRouter.post('/',AuthMiddleware.isAdmin,CategoryMiddleware.addFields,CategoryController.add)
categoryRouter.delete('/:id',CategoryController.del)

exports.categoryRouter = categoryRouter;