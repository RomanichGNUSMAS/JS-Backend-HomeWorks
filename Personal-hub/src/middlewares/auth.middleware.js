import { AppError } from "../utils/AppError.js";

function errorus(messasge, statusCode = 400) {
    throw new AppError(messasge, statusCode)
}

function dataValidator(req, res, next) {
    try {
        const { username, password } = req.body;
        if (!username || !username.trim()) errorus('username is not valid defined', 400);
        if (!password || !password.trim() || password.length < 8) errorus('password is not valid defined', 400);
        req.username = username;
        req.password = password;
        next();
    } catch (err) {
        next(err)
    }
}

function loginTokenValidator(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header.startsWith('Bearer')) errorus('token is not valid defined', 400);
        else if (!header.split(' ')[1].trim()) errorus('token is not valid filled', 400);
        next();
    } catch (err) {
        next(err)
    }
}

export { dataValidator, loginTokenValidator }