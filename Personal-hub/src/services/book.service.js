import { createBook, deleteBook, getApiBooks, getBookByID, updateBook } from "../models/book.model.js"

export const getOwnerBooks = async (ownerid) => {
    const response = await getApiBooks(ownerid);
    return response;
}

export const aboutBookByID = async (id) => {
    const response = await getBookByID(id);
    return response;
}

export const addBook = async (ownerid,title,author) => {
    const response = await createBook(ownerid,title,author);
    return response;
}

export const update = async (id,updateObject) => {
    const response = await updateBook(id,updateObject);
    return 204;
}

export const del = async (id) => {
    const response = await deleteBook(id)
    return response;
}