import { aboutUser, addUser, login } from "../services/auth.service.js"
import { AppError } from '../utils/AppError.js'
import { verifyToken } from "../utils/token.js";

export const register = async (req, res, next) => {
    try {
        const { username, password } = req;
        const registration = await addUser(username, password);
        return res.json(registration);
    } catch (err) {
        next(err);
    }
}

export const LogIn = async (req, res, next) => {
    try {
        const { username, password } = req;
        const response = await login(username, password);
        res.cookie('token', response, {
            httpOnly: true
        })
        return res.send(response);
    } catch (err) {
        next(err);
    }
}

export const about = (req, res, next) => {
    try {
        const headerToken = req.headers.authorization.split(' ')[1];
        verifyToken(headerToken ? headerToken : req.cookie.token, async (err, decoded) => {
            if (err) throw new AppError('Forbiden', 403);

            const user = await aboutUser(decoded.id);
            res.cookie('token', user, {
                httpOnly: true
            });
            if (user == 404) throw new AppError('user not found', 404);
            return res.json(user);
        });
    } catch (err) {
        next(err);
    }
}