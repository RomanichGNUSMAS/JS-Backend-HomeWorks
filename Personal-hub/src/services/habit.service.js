import { checkInHabit, createHabit, deleteHabit, getHabitByID, getHabitByOwnerID, updateHabit } from "../models/habit.model.js"

export const getOwnerHabits = async (ownerid) => {
    const response = await getHabitByOwnerID(ownerid);
    return response;
}

export const getHabit = async (id) => {
    const response = await getHabitByID(id);
    return response;
}

export const create = async (ownerid,name,frequency,checkIns) => {
    const response = await createHabit(ownerid,name,frequency,checkIns);
    return response;
}

export const update = async (id,updateObject) => {
    const response = await updateHabit(id,updateObject);
    return 204;
}

export const checkIn = async (id) => {
    const response = await checkInHabit(id);
    return 204;
}

export const del = async (id) => {
    const response = await deleteHabit(id);
    return response;
}