import { AppError } from "../utils/AppError.js";

function errorMiddleware(err, req, res, next) {
    const isKnown = err instanceof AppError;
    const status = isKnown ? err.statusCode : 500;
    const message = isKnown ? err.message : 'Internal Server Error';
    if (!isKnown) console.error(err);
    return res.status(status).json({
        error: { message, status }
    });
}

export default errorMiddleware