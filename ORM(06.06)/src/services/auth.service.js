const { prisma } = require("../configs/db");
const { ConflictCollection : { ConflictError }, RequestCollection : {RequestError} } = require("../configs/Errors");
const { AuthRepository } = require("../repositories/auth.repository");
const { comparePassword } = require("../utils/hashing");

exports.AuthService = class {
    static async registerUser(rawData) {
        const { email,password } = rawData;

        const found = await prisma.user.findFirst({
            where : {
                email:email
            },
            select: {
                email:true
            }
        })
        if(found) {
            throw new ConflictError("user with this email already exists");
        } 
        return AuthRepository.createUser(rawData);
    }
    static async logInUser(rawData) {
        const { email,password } = rawData;

        const foundUser = await prisma.user.findFirst({
            select: {
                password:true,
                email:true
            },
            where : {
                email:email
            }            
        })

        if(!foundUser) throw new RequestError("user not found",404);
        const comparedPassword = await comparePassword(password,foundUser.password);

        if(!comparePassword) throw new RequestError("invalid password",401);
        return AuthRepository.logIntoUser(rawData)
    }
}