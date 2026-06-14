exports.ReviewMiddleware = class {
    static addFields(req, res, next) {
        try {
            const { rating } = req.body;
            if ((rating && rating < 0 || rating > 5)) 
                return next(new Error('invalid credentials'));
            return next();
        } catch (err) { next(err) }
    }
}