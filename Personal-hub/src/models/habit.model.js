import { AppError } from "../utils/AppError.js";
import { readJSON, writeJSON } from "../utils/fileDB.js"
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { paths } from '../config/paths.js'

const { habitsPath } = paths
export const getHabitByOwnerID = async (id) => {
    const habits = await readJSON(habitsPath);
    const res = [];
    for(const habit of habits) {
        if(await verifyPassword(id,habit.ownerid)) {
            res.push(habit);
        }
    }
    return res;
}

export const getHabitByID = async (id) => {
    const habits = await readJSON(habitsPath);
    for(const habit of habits) {
        if(id == habit.id) return habit;
    }
    throw new AppError('habit not found');
}

export const createHabit = async (ownerid,name,frequency,checkIns) => {
    const habits = await readJSON(habitsPath);
    const date = new Date().toISOString();
    const newHabit = {
        id:Date.now(),
        ownerid,name,frequency,checkIns,
        createdAt:date,
        updatedAt:date
    }
    habits.push(newHabit);
    await writeJSON(habitsPath,habits);
    return true;
}

export const updateHabit = async (id,updateObject) => {
    const habits = await readJSON(habitsPath);
    for(let i = 0;i < habits.length;++i) {
        if(id == habits[i].id) {
            habits[i] = {
                ...habits[i],...updateObject,updatedAt:new Date().toISOString()
            }
            await writeJSON(habitsPath,habits);
            return true;
        }
    }
    throw new AppError('habit not found',404);
}

export const checkInHabit = async (id) => {
    const habits = await readJSON(habitsPath);
    for(let i = 0;i < habits.length;++i) {
        if(habits[i].id == id) {
            habits[i].checkIns++;
            await writeJSON(habitsPath,habits);
            return true;
        }
    }
    throw new AppError('habit not found',404);
}

export const deleteHabit = async (id) => {
    const habits = await readJSON(habitsPath);
    const newHabits = [];
    let deletedHabit = null;
    for(const habit of habits) {
        if(id == habit.id) {
            deletedHabit = habit;
            continue;
        }
        newHabits.push(habit)
    };
    if(habits.length == newHabits.length) throw new AppError('habit not found',404);
    await writeJSON(habitsPath,newHabits);
    return deletedHabit;
}