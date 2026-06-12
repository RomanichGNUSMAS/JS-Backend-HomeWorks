exports.CategoryMiddleware = class {
    static addFields(req,res,next) {
        try {
            const { name } = req.body;
            if(!name?.trim()) next(new Error('invalid category name'))
            next()
        } catch (err) { next(err) }
    }
}