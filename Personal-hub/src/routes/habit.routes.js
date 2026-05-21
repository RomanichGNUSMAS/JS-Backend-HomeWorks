import { Router } from "express";
import { checkInHabit, createHabit, deleteHabit, habit, updateHabit } from "../controllers/habit.controller.js";
import { habitValidator, idCheck, owneridCheck } from "../middlewares/validate.middleware.js";

const habitRouter = Router();

habitRouter.get('/:id',idCheck, habit);

habitRouter.post('/',owneridCheck,habitValidator, createHabit);

habitRouter.patch('/:id',idCheck,habitValidator, updateHabit);

habitRouter.patch('/:id/check-in',idCheck,checkInHabit);

habitRouter.delete('/:id',idCheck,deleteHabit);

export default habitRouter