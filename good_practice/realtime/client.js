const client = require('socket.io-client');

let socket = client.connect('http://localhost:4000',{reconnect:true});

socket.on('connect',function() {
    console.log("\n\n Socket connected from NodeJS\n\n");
});

module.exports = socket;