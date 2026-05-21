import { AppError } from "../utils/AppError.js";
import { readJSON, writeJSON } from "../utils/fileDB.js"
import { hashPassword, verifyPassword } from "../utils/hash.js";
import { signToken } from "../utils/token.js";
import { paths } from '../config/paths.js'

const { usersPath } = paths;
export const getAboutUser = async (id) => {
    const users = await readJSON(usersPath);
    for(const user of users) {
        if(await verifyPassword(id,user.id)) return user;
    }
    throw new AppError('user not found',404);
}

export const registerUser = async (username,password) => {
    console.log(paths)
    const users = await readJSON(paths.usersPath);
    if(users.find(user => user.username == username)) {
        throw new AppError('user with this name already exists',409);
    }
    const date = Date.now();
    const newUser = {
        id:date,
        username,password:await hashPassword(password),
        createdAt: new Date().toISOString()
    }
    users.push(newUser);
    await writeJSON(paths.usersPath,users);
    return newUser;
}

export const loginIntoUserAccount = async (username,password) => {
    const users = await readJSON(paths.usersPath);
    const found = users.find(user => user.username == username);
    if(!found) throw new AppError('user not found',404);
    if(!(await verifyPassword(password,found.password))) throw new AppError('invalid password');
    const key = signToken({id:found.id});
    return key;
}