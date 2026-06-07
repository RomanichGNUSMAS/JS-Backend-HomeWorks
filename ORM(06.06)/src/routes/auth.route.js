const { AuthController } = require('../controllers/auth.controller');

const authRouter = require('express').Router();

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)

exports.authRouter = authRouter