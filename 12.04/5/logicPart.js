const fs = require('fs/promises')

module.exports = { 
    sendToLog: async function (message,path) { 
        await fs.appendFile(path,`${message.date} -> ${message.msg}\n`);
    }
}