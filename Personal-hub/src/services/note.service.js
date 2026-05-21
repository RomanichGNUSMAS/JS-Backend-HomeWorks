import { createNewNote, deleteNote, getAboutUserNotes, getNoteByID, updateNote } from "../models/note.model.js"

export const userNotes = async (ownerid) => {
    const response = await getAboutUserNotes(ownerid);
    return response;
}

export const getNote = async (id) => {
    const response = getNoteByID(id);
    return response;
}

export const addNote = async (ownerid,title,body,tags) => {
    const response = createNewNote(ownerid,title,body,tags);
    return response;
}

export const update = async (id,updateObject) => {
    const response = await updateNote(id,updateObject);
    return 204;
}

export const del = async (id) => {
    const response = await deleteNote(id);
    return response
}