import jwt from 'jsonwebtoken';
import env from '../config/env.js'

export const signToken = (payload) => {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' })
}

export const verifyToken = (token,callback = () => {}) => {
    try {
        const verify = jwt.verify(token, env.JWT_SECRET,callback);
        return true;
    } catch {
        return false;
    }
}