exports.AuthMiddleware = class {
    static registerFields (req,res,next) {
        try { 
            const { name,email,password } = req.body;
            if(!name?.trim() || !email?.trim() || !password?.trim()) {
                return res.send('invalid credentials')
            }
            next()
        } catch (err) { next(err) }
    }

    static loginFields (req,res,next) {
        try { 
            const { email,password } = req.body;
            if(!email?.trim() || !password?.trim()) {
                return res.send('invalid credentials')
            }
            next()
        } catch (err) { next(err) }
    }

    static getFields (req,res,next) {
        try { 
            const { email } = req.body;
            const token = req.headers.authorization;
            if(!token?.trim() || !token.startsWith('Bearer ')) return res.status(401).send('invalid token')
            if(!email?.trim()) {
                return res.status(401).send('invalid credentials')
            }
            next()
        } catch (err) { next(err) }
    }
}