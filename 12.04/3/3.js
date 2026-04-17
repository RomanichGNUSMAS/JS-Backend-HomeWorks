const fs = require('node:fs/promises');
const path = require('node:path');
const { sceletonHandler } = require('./html-sceleton');


async function exists (path) {
    try {
        await fs.access(path, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false
    }
}

async function handler (dirname,fileName) {
    let pathFinder = path.resolve(dirname);
    if(!(await exists(pathFinder))) {
        pathFinder = path.resolve(dirname)
        await fs.mkdir(pathFinder, {recursive:true});
    }
    return await fs.writeFile(path.join(dirname,fileName +'.html'),sceletonHandler(fileName))
}

(async function () {
    const req = await handler('.asd','eraror');
    console.log(req)
})();