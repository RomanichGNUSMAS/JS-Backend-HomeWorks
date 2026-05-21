import { Router } from "express";
import { books, createBook, deleteBook, updateBook } from "../controllers/books.controller.js";
import { bookValidator, idCheck, owneridCheck } from "../middlewares/validate.middleware.js";

const bookRouter = Router();

bookRouter.get('/:id',idCheck, books);

bookRouter.post('/',owneridCheck,bookValidator ,createBook);

bookRouter.patch('/:id',idCheck,bookValidator, updateBook);

bookRouter.delete('/:id',idCheck, deleteBook);

export default bookRouter;