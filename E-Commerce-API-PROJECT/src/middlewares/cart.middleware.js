exports.CartMiddleware = class {
    static checkToken(req,res,next) {
        const token = req.headers.authorization;
        if(!token?.trim() || !token.startsWith('Bearer ')) next(new Error('invalid token'))
        next()
    }

    static addFields(req,res,next) {
        try {
            const { cartId,productId,quantity } = req.body;
            if(!cartId || !productId || (quantity && quantity <= 0)) next(new Error('invalid credentials')) 
            next()
        } catch (err) { next(err) }
    }

    static updateFields(req,res,next) {
        try {
            const { quantity } = req.body;
            if(!quantity || quantity <= 0) next(new Error('invalid quantity'));
            next()
        } catch (err) { next(err) }
    }
}