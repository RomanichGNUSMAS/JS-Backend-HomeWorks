require('dotenv').config({ quiet: true });
const jwt = require('jsonwebtoken');

exports.createKey = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET);
}

exports.verifyKey = (email,key) => {
    try {
        const payload = jwt.verify(key, process.env.JWT_SECRET);
        if(payload.email != email) return null;
        return true;
    } catch { return null }
}