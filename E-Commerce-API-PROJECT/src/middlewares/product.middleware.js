exports.ProductMiddleware = class {
    static async addFields(req, res, next) {
        try {
            const { name, stock } = req.body;
            if (!name?.trim() || stock <= 0 || isNaN(+stock)) next(new Error('invalid credentials'))

            return next()
        } catch (err) { next(err) }
    }
    static async updateFields(req, res, next) {
        try {
            const { name, stock } = req.body;
            if (!(name && name.trim()) || !(stock && (stock > 0))) next(new Error('invalid credentials'))

            return next()
        } catch (err) { next(err) }
    }
    static async checkId(req, res, next) {
        try {
            const { id } = req.params;
            if (!id || isNaN(+id)) next(new Error('invalid ID'));
            next();
        } catch (err) { next(err) }
    }
}