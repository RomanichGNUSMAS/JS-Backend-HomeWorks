import bcrypt from 'bcrypt'

const saltingCount = 10;

export const hashPassword = async (plain) => {
    if(typeof plain !== 'string') return false;
    const hashed = await bcrypt.hash(plain,saltingCount);
    return hashed;
}

export const verifyPassword = async (password,encryptedPassword) => {
    const compare = await bcrypt.compare(password,encryptedPassword);
    return compare;
}

