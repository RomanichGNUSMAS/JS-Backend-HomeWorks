import { userNotes,getNote, update, addNote, del } from "../services/note.service.js";

export const notes = async (req,res,next) => {
    try {
        const { ownerid } = req.body;
        const respose = await userNotes(ownerid);
        return res.json(respose);
        next();
    } catch (err) {
        next(err);
    }
}

export const note = async (req,res,next) => {
    try {
        const { id } = req.params;
        const response = await getNote(id);
        return res.json(response);
        next();
    } catch (err) {
        next(err);
    }
}

export const createNote = async (req,res,next) => {
    try {
        const { ownerid,title,body,tags } = req.body; 
        const response = await addNote(ownerid,title,body,tags);
        return res.json(response);
        next();
    } catch (err) {
        next(err);
    }
}

export const updateNote = async (req,res,next) => {
    try {
        const { id } = req.params;
        const { title,body,tags } = req.body;
        const response = await update(id,{ title,body,tags });
        return res.sendStatus(204);        
        next();
    } catch (err) {
        next(err);
    }
}

export const deleteNote = async (req,res,next) => {
    try {
        const { id } = req.params;
        const response = await del(id);
        return res.status(201).json(response)
        next();
    } catch (err) {
        next(err);
    }
}