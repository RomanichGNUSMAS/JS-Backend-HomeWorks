const fs = require('node:fs');
const path = require('node:path');
const { parser } = require('./handler');
const { log } = require('console');

try {
    
    const pathname = path.resolve('config.env');
    const content = fs.readFileSync(pathname,{encoding:'utf-8'});
    const obj = parser(content);
    log(obj)
} catch (e) {
    console.error(e.message)
}