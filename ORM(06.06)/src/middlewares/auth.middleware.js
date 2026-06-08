const { RequestCollection, ConflictCollection } = require("../configs/Errors")

exports.errorMiddleware = (err,req,res,next) => {
    if(RequestCollection.isRequestError(err) || ConflictCollection.isConflictError(err)) {
        return res.status(err.statusCode || 409).send({ err:`Request Failure: ` + err.message })
    }
    res.status(500).send(err.message)
} 

exports.tokenMiddleWare = (req,res,next) => {
    const token = req.headers.authorization;
    console.log(req.headers)
    if(!token?.trim() || !token.startsWith('Bearer ')) {
        throw new (RequestCollection.RequestError)('invalid token',403);    
    }
    req.token = token.split(' ')[1];
    next();
}