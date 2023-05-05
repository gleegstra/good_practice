const express = require('express');

const server = express();

server.set('view engine','ejs'); //se setea motor de paginas a usar
server.use('/assets',express.static('assets')); //se agrega middleware, agregando opciones se puede indicar estategia a utilizar etag o max-age

server.get('/',function(req,res) {
/*
    se pasa archivo index y se indica con opciones la ubicacion relativa del doc
    res.sendFile('index.html',{
        root: __dirname
    });
*/
    res.render('index'); //se renderiza pagina con el motor de vista
});

server.listen(3000);