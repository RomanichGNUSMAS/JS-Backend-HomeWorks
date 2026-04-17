const fs = require('node:fs');
const path = require('node:path');
const { sendToLog } = require('./logicPart')

class Logger {

    constructor() {
        if (!fs.existsSync('system_log.txt')) {
            fs.writeFileSync(path.join(__dirname, 'system_log.txt'), '')
        }
    }

    async log(msg) {
        try {
            const now = new Date();
            await sendToLog(
                {
                    date: [now.toLocaleString()], msg
                },
                path.join(
                    path.resolve('system_log.txt')
                )
            )
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    }
}

const logger = new Logger();
logger.log('Created base')
logger.log('Updated base')
