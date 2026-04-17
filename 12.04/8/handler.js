const fs = require('fs/promises');
const path = require('path');

module.exports.generator = async function (dirname) {
    try {
        const absPath = path.resolve(dirname);
        const childs = await fs.readdir(absPath);
        for(let i = 0;i < childs.length;++i) {
            const fileName = childs[i];
            
            const oldPath = path.join(absPath, fileName);
            
            const prefix = String(i + 1).padStart(2, '0'); 
            
            const newPath = path.join(absPath, `${prefix}_${fileName}`);
            await fs.rename(oldPath,newPath);
        }
    } catch (e) {
        console.error(e.message);
        return;
    }
}