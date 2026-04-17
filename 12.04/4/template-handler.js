const path = require('path');
const fs = require('fs');
const { log } = require('console');

module.exports.handler = function (object) {
    const text = fs.readFileSync('./template.txt', {encoding:'utf-8'});
    let str = text.replace(/{{(\w+)}}/g, (match,key) => {
        log(key)
        return object[key] || match 
    })
    fs.writeFileSync(path.join(__dirname,'out.txt'), str);
}