const { prisma } = require("../configs/db");
const { cleanRegister } = require("../utils/clearObject");
const { hashPassword, comparePassword } = require("../utils/hash");
const { createKey, verifyKey } = require("../utils/jwt");

exports.AuthRepository = class {
    static async register(rawData) {
        const { email,password } = rawData;
        const found = await prisma.user.findUnique({
            where : { email }
        })
        if(found) return null;
        const hashedPassword = await hashPassword(password);
        const clearObj = cleanRegister(rawData)
        const newUser = await prisma.user.create({ data: {...clearObj,password:hashedPassword} });
        return newUser;
    }

    static async login(rawData) {
        const { email,password } = rawData;
        const found = await prisma.user.findUnique({
            where : { email:email }
        })
        if(!found) return 404;
        
        const compare = await comparePassword(password,found.password);
        if(!compare) return 401;
        return createKey(email);
    }

    static async getMe(token) {
        const user = await prisma.user.findUnique({
            where: { email }
        })
        if(!user) return 404;
        const jwt = verifyKey(token);
        if(!jwt) return 403;
        return user;
    }
}