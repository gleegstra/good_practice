const http = require('http');

function responderPeticion(request,response) {
    response.end('Hola Mundo utilizando solo Nodejs');
}

let server = http.createServer(responderPeticion);

server.listen(3000);