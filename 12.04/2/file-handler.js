const fs = require('node:fs/promises');
const path = require('node:path')

module.exports.handler = async function (dirname, fileExtension) {
    try {
        const absPath = path.resolve(dirname)
        const childList = await fs.readdir(absPath);
        for (let child of childList) {
            const absPath = path.resolve(dirname);
            if (path.extname(child) === fileExtension) {
                const Path = path.join(absPath, child)
                console.log(Path);

            }
        }
    } catch (e) {
        console.error(e);
    }
}
