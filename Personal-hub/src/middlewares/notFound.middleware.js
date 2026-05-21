import { AppError } from "../utils/AppError.js";

function notFound (req,res,next) {
    try {
        throw new AppError('route not found',404);
    } catch (err) {
        next(err);
    }
}

export default notFound