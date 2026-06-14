exports.OrderMiddleware = class {
    static addFields(req,res,next) {
        const userId = req.body.userId;
        if(!userId || isNaN(userId)) next(new Error('invalid userId'))
        next()  
    }
}