const bcrypt = require('bcrypt')

exports.hashPassword = (password) => {
    const salt = 10;
    return bcrypt.hash(password,salt)
}

exports.comparePassword = (password,hashedPassword) => {
    return bcrypt.compare(password,hashedPassword);

}