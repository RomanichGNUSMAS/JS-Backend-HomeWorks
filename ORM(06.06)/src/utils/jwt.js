const jwt = require('jsonwebtoken');
require('dotenv').config({ quiet:true });

exports.createNew = (value) => {
    return jwt.sign({ value },process.env.JWT_SECRET);
}

exports.verify = (value) => {
    return jwt.verify(value,process.env.JWT_SECRET);
}