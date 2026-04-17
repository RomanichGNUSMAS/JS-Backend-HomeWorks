const fs = require('fs/promises');
const path = require('path');
const data = require('./data');

module.exports.checker = async function (pathname) {
    try {
        const absPath = path.resolve(pathname);
        const size = await fs.stat(absPath);
        if(size.size >= 1024) throw new RangeError('Out of Range');

        const json = JSON.stringify(data,null,2)

        const outputPath = path.resolve('base.json');
        await fs.writeFile(outputPath, json);
    } catch (e) {
        console.error(e.message);
        return;
    }
}