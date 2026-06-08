const { AuthController } = require('../controllers/auth.controller');
const { tokenMiddleWare } = require('../middlewares/auth.middleware');

const authRouter = require('express').Router();

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.get('/verify', tokenMiddleWare, AuthController.webVerify);

exports.authRouter = authRouter