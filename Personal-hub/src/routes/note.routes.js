import { Router } from "express";
import { createNote, deleteNote, note, notes, updateNote } from "../controllers/notes.controller.js";
import { idCheck, noteValidator, owneridCheck } from "../middlewares/validate.middleware.js";
const noteRouter = Router();

noteRouter.get('/:id',idCheck, note)

noteRouter.post('/',owneridCheck,noteValidator, createNote);

noteRouter.patch('/:id',idCheck,noteValidator, updateNote);

noteRouter.delete('/:id',idCheck,deleteNote);

export default noteRouter;