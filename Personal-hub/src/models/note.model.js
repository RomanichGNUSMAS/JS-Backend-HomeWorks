import { AppError } from "../utils/AppError.js";
import { readJSON, writeJSON } from "../utils/fileDB.js";
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { paths } from '../config/paths.js';

const { notesPath } = paths;
export const getAboutUserNotes = async (id) => {
    const res = [];
    const notes = await readJSON(notesPath);
    for(const note of notes) {
        if(id == note.ownerid) {
            res.push(note);
        }
    }
    return res;
}

export const getNoteByID = async (id) => {
    const notes = await readJSON(notesPath);
    for(const note of notes) {
        if(id == note.id) {
            return note;
        }
    }
    throw new Error('note not found',404);
}

export const createNewNote = async (ownerid,title,body,tags) => {
    const notes = await readJSON(notesPath);
    const date = new Date().toISOString()
    const newNote = {
        id:Date.now(),
        ownerid,
        title,body,tags,
        createdAt:date,
        updatedAt:date
    }
    notes.push(newNote);
    await writeJSON(notesPath,notes);
    return newNote;
}

export const updateNote = async (id,updateObject) => {
    const notes = await readJSON(notesPath);
    for(let i = 0; i < notes.length;++i) {
        if(id == notes[i].id) {
            notes[i] = {
                ...notes[i],...updateObject,updatedAt:new Date().toISOString()
            }
            await writeJSON(notesPath,notes);
            return true;
        }
    }
    throw new AppError('note not found',404);
}

export const deleteNote = async (id) => {
    const notes = await readJSON(notesPath);
    const newNotes = [];
    let deletednote = null;
    for(const note of notes) {
        if(id == note.id) {
            deletednote = note;
            continue;
        }
        newNotes.push(note)
    }
    if(notes.length !== newNotes.length) {
        await writeJSON(notesPath,newNotes);
        return true;
    }
    throw new AppError('note not found',404);
}