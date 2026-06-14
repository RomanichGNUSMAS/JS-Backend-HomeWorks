require('dotenv').config({ quiet: true });
const jwt = require('jsonwebtoken');

exports.createKey = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET);
}

exports.verifyKey = (key) => {
    try {
        return jwt.verify(key, process.env.JWT_SECRET);
    } catch { return null }
}