const path = require('path');
const express = require('express');
const app = express();

// Settings

app.set('port', process.env.PORT || 3000 );

//static file 
app.use(express.static(path.join(__dirname,'public')))
console.log(path.join(__dirname,'public'));

// start server

const server = app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'));
});



const SocketIO = require('socket.io');
const io = SocketIO(server);

// web sockets

io.on ('connection', function(client){
    console.log('new connection');

    // send the clients id to the client itself.
    client.send(client.id);
    console.log(client.id);


    client.on('chatTransmilenio',(data)=>{
        console.log(data);
        io.sockets.emit('chatTransmilenio',data);
    });


    client.on('disconnect', function () {
        console.log('client disconnected');
    });
});

