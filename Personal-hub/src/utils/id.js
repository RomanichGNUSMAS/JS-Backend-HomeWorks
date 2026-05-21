import bcrypt from 'bcrypt';

const saltRounds = 10;

export const generateID = async (prefix) => {
    const encryptedPassword = await bcrypt.hash(prefix,saltRounds);
    return encryptedPassword
}