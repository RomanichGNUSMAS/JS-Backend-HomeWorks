import { AppError } from "../utils/AppError.js";

function errorus(message, statusCode) {
    throw new AppError(message, statusCode);
}

function ifCondition(identifier,name) {
    if (!identifier || !identifier.trim()) {
            errorus(`${name} is not valid defined`, 400);
        }
}

function idCheck(req, res, next) {
    try {
        const { id } = req.params;
        ifCondition(id,'id');
        next();
    } catch (err) {
        next(err)
    }
}

function owneridCheck(req,res,next) {
    try {
        const { ownerid } = req.body;
        if(!ownerid || ownerid < 0) errorus('owner id is not valid definde',400)
        next();
    } catch (err) {
        next(err)
    }
}

function bookValidator(req, res, next) {
    try {
        const { title,author } = req.body;
        ifCondition(title,'title');
        ifCondition(author,'author');
        next()
    } catch (err) {
        next(err)
    }
}

function habitValidator(req,res,next) {
    try {
        const { name,frequency,checkIn } = req.body;
        ifCondition(name,'name');
        ifCondition(frequency,'frequency');
        if(!checkIn || !Number.isInteger(checkIn)) errorus('checkIn is not valid defined',400);
        next();
    } catch (err) {
        next(err)
    }
}

function noteValidator(req,res,next) {
    try {
        const { title,body,tags } = req.body;

        ifCondition(title,'title');
        ifCondition(body,'body');
        if(!tags || !Array.isArray(tags)) errorus('tags is not valid defined',400);
        next();
    } catch (err) {
        next(err)
    }
}

export {
    idCheck,owneridCheck,bookValidator,habitValidator,noteValidator
}