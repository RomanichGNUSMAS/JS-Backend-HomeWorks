const fs = require('fs/promises');
const path = require('path');

const asyncExists = async (path) => {
    try {
        await fs.access(path);
        return true;
    } catch (e) {
        return false;
    }
}

module.exports.creator = async function (pathnames) {
    for (const pathname of pathnames) {
        try {
            const fullPath = path.resolve(__dirname,pathname);
            if(await asyncExists(fullPath)) continue;
            await fs.mkdir(fullPath, { recursive: true });
        } catch (e) {
            console.error(e.message);
            return;
        }
    }
}