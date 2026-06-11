const { AuthService } = require("../services/auth.service")

exports.AuthController = class {
    static async register(req,res,next) {
        try { 
            const result = await AuthService.register(req.body);
            return res.status(201).json(result);
        } catch (err) { next(err) }
    }

    static async login(req,res,next) {
        try { 
            const result = await AuthService.login(req.body);
            return res.status(200).json(result);
        } catch (err) { next(err) }
    }

    static async me(req,res,next) {
        try {
            const token = req.headers.authorization; 
            const result = await AuthService.get(req.body.email,token);
            return res.status(200).json(result);
        } catch (err) { next(err) }
    }
}