import authRouter from "./auth.routes.js";
import bookRouter from "./book.routes.js";
import habitRouter from "./habit.routes.js";
import noteRouter from "./note.routes.js";
import { Router } from "express";

const router = Router();

router.use('/auth', authRouter);
router.use('/books', bookRouter);
router.use('/habits', habitRouter);
router.use('/notes', noteRouter);

export default router;