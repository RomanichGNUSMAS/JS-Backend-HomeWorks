const { prisma } = require("../configs/db");
const { verifyKey } = require("../utils/jwt");

exports.AuthMiddleware = class {
    static registerFields(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name?.trim() || !email?.trim() || !password?.trim()) {
                return res.send('invalid credentials')
            }
            next()
        } catch (err) { next(err) }
    }

    static loginFields(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!email?.trim() || !password?.trim()) {
                return res.send('invalid credentials')
            }
            next()
        } catch (err) { next(err) }
    }

    static getFields(req, res, next) {
        try {
            const { email } = req.body;
            const token = req.headers.authorization;
            if (!token?.trim() || !token.startsWith('Bearer ')) return res.status(401).send('invalid token')
            if (!email?.trim()) {
                return res.status(401).send('invalid credentials')
            }
            next()
        } catch (err) { next(err) }
    }

    static async isAdmin(req, res, next) {
        try {
            const headers = req.headers.authorization;
            if (!headers?.trim() || !headers.startsWith('Bearer ')) return next(new Error('invalid token'));
            const token = headers.split(' ')[1];
            const jwt = verifyKey(token);
            if (!jwt) return next(new Error('wrong token'));
            const user = await prisma.user.findUnique({
                where: { email: jwt.email }
            })
            if (!user || user.role != 'admin') return next(new Error('you habe not permission doing this operation'))
            next()
        } catch (err) { next(err) }
    }

    static checkToken(req, res, next) {
        const headers = req.headers.authorization;
        if (!headers?.trim() || !headers.startsWith('Bearer ')) return next(new Error('invalid token'));
        const token = headers.split(' ')[1];
        const jwt = verifyKey(token);
        if (!jwt) return next(new Error('wrong token'));
        next()
    }
}