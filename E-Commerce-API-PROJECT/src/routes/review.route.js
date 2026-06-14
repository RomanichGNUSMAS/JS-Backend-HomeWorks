const { ReviewController } = require('../controllers/review.controller');
const { ReviewMiddleware } = require('../middlewares/review.middleware');
const { AuthMiddleware } = require('../middlewares/auth.middleware');

const reviewRouter = require('express').Router({ mergeParams: true });

reviewRouter.get('/', ReviewController.get);
reviewRouter.post('/',AuthMiddleware.checkToken,ReviewMiddleware.addFields,ReviewController.add);

exports.reviewRouter = reviewRouter;
