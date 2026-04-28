const net = require('node:net');

const client = net.createConnection({port:3000, host:'localhost'});

client.on('data',(msg) => {
    console.log(msg.toString())
})

process.stdin.on('data',(msg) => {
    client.write(msg);
})