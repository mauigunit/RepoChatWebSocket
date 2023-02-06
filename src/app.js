const express = require('express');
const app = express();
const { Server } = require('socket.io');

/*app.use(express.json());
app.use(express.urlencoded({extended: true}));*/
app.use(express.static('src/public'));

const messages = [];

const httpServer = app.listen(8080, () => console.log('Server running on port 8080'));
httpServer.on('error', error => console.log(error));

const io = new Server(httpServer);



io.on('connection', socket =>{
    console.log('Nuevo cliente.');
    socket.emit('messages', messages);

    socket.on('newUserLoged', user =>{
        io.sockets.emit('newUser', user);
    })

    socket.on('message', data =>{
        messages.push(data);
        io.sockets.emit('messages', messages);
    })
})