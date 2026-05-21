import fs from 'node:fs/promises'
import path from 'node:path'

async function existsAsync(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export const readJSON = async (pathname) => {
    if(!(await existsAsync(pathname))) {
        return false;
    }
    const readFile = JSON.parse(await fs.readFile(pathname,'utf-8'));
    return readFile;
}

export const writeJSON = async (pathname,data) => {
    if(!(await existsAsync(pathname))) {
        return false
    }
    await fs.writeFile(path.resolve(pathname),JSON.stringify(data,null,2));
    return true;
}