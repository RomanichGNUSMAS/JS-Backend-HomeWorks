const { prisma } = require("../configs/db");
const { hashPassword } = require("../utils/hashing");
const { createNew } = require("../utils/jwt");

exports.AuthRepository = class  {
    static async createUser(rawData) {
        const { password,age } = rawData;

        const hashedPassword = await hashPassword(password);
        const newUser = {
            ...rawData,password:hashedPassword
        };
        
        return prisma.user.create({ data:{...newUser,password:hashedPassword,age:age ? age : null} })
    }
    static async logIntoUser(rawData) {
        const { email,password } = rawData;
        return createNew(email);
    }
}

