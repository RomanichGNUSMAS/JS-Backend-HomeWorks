const bcrypt = require('bcrypt');

exports.hashPassword = (value) => {
    const salt = 10;
    return bcrypt.hash(value,salt);
}

exports.comparePassword = (currentPassword,hashedPassword) => {
    return bcrypt.compare(currentPassword,hashedPassword);
}