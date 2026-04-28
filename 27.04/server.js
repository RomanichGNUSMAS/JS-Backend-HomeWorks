const net = require('node:net');

const clients = new Set();

const shareInfo = function (socket,msg) {
    for(const cl of clients) {
        if(cl !== socket)
            cl.write(`${new Date().toTimeString()} from ${socket.name}: ${msg}`)
    }
}

const sendPrivately = function (from,name,msg) {
    for(const cl of clients) {
        if(cl.name === name) {
            cl.write(`${new Date().toTimeString()} Privately from ${from.name}: ${msg}`);
            return;
        }
    }
    from.write('WARN: user not found!');
}

const server = net.createServer((socket) => {
    socket.write('enter your name: ')
    socket.once("data", (data) => {
        const name = data.toString().trim();
        for(const cl of clients) {
            if(cl.name === name) {
                socket.write('name is busy');
                socket.destroy();
                return;
            }
        }
        socket.name = name;
        clients.add(socket);
        shareInfo(socket,`${name} joined the chat`);
    

    socket.on('data', (data) => {
        if(socket.busy) return;
        if(data.toString().trim().toLowerCase() == 'exit') {
            socket.destroy();
            return;
        }
        if(data.toString().startsWith('/dm')) {
            socket.busy = true;
            socket.write('enter his/her name');
            socket.once("data", (data) => {
                const name = data.toString().trim();
                if(!name) {
                    socket.write('ERROR: Invalid Name');
                    socket.busy = false;
                    return;
                }
                socket.write('write message: ');
                socket.once("data",(data) => {
                    if(data.toString().trim()) {
                        sendPrivately(socket,name,data.toString());
                    }
                    socket.busy = false;
                })
            })
            return;
        }

        shareInfo(socket,`${socket.name} wrote a message! -> ${data.toString()}`)
    })

    socket.on('close', () => {
        console.log(`${socket.name} left(`);
        clients.delete(socket);
    })
})
})

server.listen(3000,'localhost');