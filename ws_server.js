var WebSocket = require('ws');
var WebSocketServer = require('ws').Server;
var io = new WebSocketServer({ port:3001});

const db = require('./mongodb_test');

io.on('connection', function(socket){
    socket.send('welcome server');

    socket.on('message', function(msg){
        console.log(msg);
        console.log("client adress -> %s", socket._socket.remoteAddress+":"+socket._socket.remotePort);
        console.log();
        io.clients.forEach(function echo(client){
            
            
            if (client !== socket && 
                client !== io && 
                client.readyState === WebSocket.OPEN) {
                
                    client.send(msg);
              }
        })
    })
});




