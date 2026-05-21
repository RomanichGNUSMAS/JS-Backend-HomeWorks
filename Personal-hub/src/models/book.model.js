import { AppError } from "../utils/AppError.js";
import { readJSON, writeJSON } from "../utils/fileDB.js"
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { paths } from '../config/paths.js'

const { booksPath } = paths;
export const getApiBooks = async (ownerid) => {
    const books = await readJSON(booksPath);
    const res = [];
    for(const book of books) {
        if(await verifyPassword(ownerid,book.ownerId)) res.push(book)
    }
    return res;
}

export const getBookByID = async (id) => {
    const books = await readJSON(booksPath);
    for(const book of books) {
        if(await verifyPassword(id,book.id)) return book;
    }
    return false;
}

export const createBook = async (ownerid,title,author,status = "null") => {
    const books = await readJSON(booksPath);
    const found = books.find(book => book.title == title);
    if(found) return false;
    const date = Date.now();
    const newBook = {
        id:date,
        ownerid:ownerid,
        title,author,status,rating:"null"
    }
    books.push(newBook);
    await writeJSON(booksPath,books);
    return newBook;
}

export const updateBook = async (id,updateObject) => {
    const books = await readJSON(booksPath);
    for(let i = 0;i < books.length;++i) {
        if(id == books[i].id) {
            books[i] = {
                ...books[i],...updateObject
            }
            await writeJSON(booksPath,books);
            return true;
        }
    }
    throw new AppError('book not found',404);
}

export const deleteBook = async (id) => {
    const books = await readJSON(booksPath);
    const newBooks = [];
    let deletedBook = null;
    for(const book of books){
        if(await verifyPassword(id,book.id)) {
            deleteBook = book;
            continue;
        }
        newBooks.push(book)
    }
    if(books.length !== newBooks.length) {
        await writeJSON(booksPath,newBooks);
        return deletedBook;
    }
    throw new AppError('book not found')
}