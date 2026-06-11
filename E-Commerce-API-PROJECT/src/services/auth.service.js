const { AuthRepository } = require("../repositories/auth.repository")

exports.AuthService = class {
    static async register(rawData) {
        const result = await AuthRepository.register(rawData);
        if(!result) throw new Error('User with this mail already exists');
        return result;
    }   

    static async login(rawData) {
        const result = await AuthRepository.login(rawData);
        switch(result) {
            case 404 : {
                throw new Error('User not found');
            }
            case 401 : {
                throw new Error('invalid password')
            }
            default : {
                return result;
            }
        }
    }

    static async get(email,token) {
        const result = await AuthRepository.getMe(email,token);
        switch (result) { 
            case 404 : {
                throw new Error('user with this id ',id,' not found');
            }
            case 403 : {
                throw new Error('you don\'t have permission to this account or token expired');
            }

            default : {
                return result;
            }
        }
    }
}