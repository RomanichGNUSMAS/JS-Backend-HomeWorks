const { AuthController } = require('../controllers/auth.controller');
const { AuthMiddleware } = require('../middlewares/auth.middleware');

const authRouter = require('express').Router();

authRouter.post('/register', AuthMiddleware.registerFields, AuthController.register)
authRouter.post('/login',AuthMiddleware.loginFields, AuthController.login)
authRouter.get('/me',AuthMiddleware.getFields,AuthController.me)

exports.authRouter = authRouter;