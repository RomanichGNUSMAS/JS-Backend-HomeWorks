const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const handler = require('./data-processor').handler;


const resolvedOb = handler(data);
(async function () {
    await fs.writeFile(path.resolve(__dirname, 'output.json'), JSON.stringify(resolvedOb, null, 2), (err) => {
        if (err) { console.error(err.message); return; }
        console.log('accepted');
    })
})();