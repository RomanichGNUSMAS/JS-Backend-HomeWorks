const { AuthService } = require("../services/auth.service");
const { registerValidator, loginValidator } = require("../validators/auth.validator");

exports.AuthController = class {
    static async register(req,res,next) {
        try {2
            console.log('asdad')
            const data = req.body;
            const shape = registerValidator.shape.parse({ ...data });
            await AuthService.registerUser(data)
            return res.sendStatus(201)
        } catch (err) { next(err) }
    }

    static async login(req,res,next) {
        try {
            const data = req.body;
            const shape = loginValidator.shape.parse({ ...data });

            const key = await AuthService.logInUser(data);
            return res.status(200).json({ token:key });
        } catch (err) { next(err) }
    }

    static async webVerify(req,res,next) {
        const { token } = req;
        try {
            const verify = await AuthService.verifyToken(token);
            return res.sendStatus(200)
        } catch (err) { next(err) }
    }
}
