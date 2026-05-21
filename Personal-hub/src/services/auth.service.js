import { getAboutUser, loginIntoUserAccount, registerUser } from "../models/auth.model.js"

export const aboutUser = async (id) => {
    const response = await getAboutUser(id);
    if(!response) return 404;
    return response;
}

export const addUser = async (username,password) => {
    const response = await registerUser(username,password);
    if(!response) return 409;
    return response;
}

export const login = async (username,password) => {
    const response = await loginIntoUserAccount(username,password);
    if(!response) return 400;
    return response;
}
