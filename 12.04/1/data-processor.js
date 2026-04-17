module.exports.handler = function (data) {
    const res = {};
    for(let key in data) {
        const newKey = key.replace(/(_\w)/g, (m) => m[1].toUpperCase());
        res[newKey] = data[key]
    }
    return res;
}