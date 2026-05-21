import { aboutBookByID, addBook, del, getOwnerBooks, update } from "../services/book.service.js";

export const books = async (req, res, next) => {
    try {
        const { ownerid } = req.body;
        const response = await getOwnerBooks(ownerid)
        next();
    } catch (err) {
        next(err);
    }
}

export const book = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await aboutBookByID(id);
        return res.json(response);
    } catch (err) {
        next(err);
    }
}

export const createBook = async (req, res, next) => {
    try {
        const { ownerid, title, author } = req.body
        const response = await addBook(ownerid, title, author);
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

export const updateBook = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, author } = req.body;
        const response = await update(id, { title, author });
        return res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}

export const deleteBook = async (req,res,next) => {
    try {
        const { id } = req.params;
        const response = await del(id);
        return res.json(response);
    } catch (err) {
        next(err);
    }
}