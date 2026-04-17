const fs = require('fs/promises');
const path = require('path');

module.exports.saver = async function (filename) {
    try {
        const filePath = path.resolve(filename);

        const { dir, name, ext } = path.parse(filePath);
        const newName = `${name}_backup${ext}`;
        const newPath = path.join(dir, newName)

        await fs.copyFile(filePath,newPath)
    } catch (e) {
        console.error(e.message);
        return;
    }
}