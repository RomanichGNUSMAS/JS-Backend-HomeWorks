import { checkIn, create, del, getHabit, getOwnerHabits, update } from "../services/habit.service.js";

export const habits = async (req, res, next) => {
    try {
        const { ownerid } = req.body;
        const response = await getOwnerHabits(ownerid);
        return res.json(response);
        next();
    } catch (err) {
        next(err);
    }
}

export const habit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await getHabit(id);
        return res.json(response);
        next();
    } catch (err) {
        next(err);
    }
}

export const createHabit = async (req, res, next) => {
    try {
        const { ownerid, name, frequency, checkIns } = req.body;
        const response = await create(ownerid, name, frequency, checkIns);
        return res.json(response)
        next();
    } catch (err) {
        next(err);
    }
}

export const updateHabit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, frequency, checkIns } = req.body;
        const response = await update(id, { name,frequency,checkIns });
        return res.sendStatus(204);
        next();
    } catch (err) {
        next(err);
    }
}

export const checkInHabit = async (req,res,next) => {
    try {
        const { id } = req.params;
        const response = await checkIn(id);
        return res.sendStatus(204);
        next();
    } catch (err) {
        next(err);
    }
}

export const deleteHabit = async (req,res,next) => {
    try {
        const { id } = req.params;
        const response = await del(id);
        return res.json(response);
        next();
    } catch (err) {
        next(err);
    }
}