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
            const result = await prisma.user.findMany({
                where : { role:"admin" }
            })
            const bearer = req.headers.authorization;

            if(!bearer?.trim() || !bearer.startsWith('Bearer ')) next(new Error("you haven't permission to work with this action"));
            const token = bearer.split(' ')[1];
            let flag = false;
            for(const user of result) {
                if(verifyKey(user.email,token))  {
                    flag = true;
                    break;
                }
            }
            if(!flag) {
                next(new Error("you haven't permission to work with this action"))
            }
            next()
        } catch (err) { next(err) }
    }
}