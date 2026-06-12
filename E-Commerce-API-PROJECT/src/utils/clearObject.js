exports.cleanProduct = (rawData) => {
    const clearObj = {};
    ['createdAt', 'name', 'description', 'stock'].forEach(t => {
        if (rawData[t] !== undefined) {
            clearObj[t] = rawData[t];
        }
    })
    return clearObj
}

exports.cleanRegister = (rawData) => {
    const clearObj = {};
    ['name', 'email', 'password', 'role'].forEach(t => {
        if (rawData[t] !== undefined) {
            clearObj[t] = rawData[t];
        }
    })
    return clearObj
}

exports.cleanCategory = (rawData) => {
    const clearObj = {};
    ['name','description'].forEach(t => {
        if(rawData[t] !== undefined) {
            clearObj[t] = rawData[t]
        }
    })
    return clearObj
}