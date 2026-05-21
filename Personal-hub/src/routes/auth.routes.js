import { Router } from 'express';
import { about, LogIn, register } from '../controllers/auth.controller.js';
import { dataValidator, loginTokenValidator } from '../middlewares/auth.middleware.js';

const authRouter = Router();

authRouter.post('/register',dataValidator,register)

authRouter.post('/login',dataValidator, LogIn)

authRouter.post('/logout', (req,res) => {
    res.clearCookie('token');
    res.sendStatus(201)
})

authRouter.get('/me',loginTokenValidator, about)

export default authRouter;