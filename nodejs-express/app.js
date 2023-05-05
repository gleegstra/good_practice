const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res) {
    res.send('Hola mundo desde Express');
});

app.get('/saludo',function(req,res) {
    res.send(`Hola ${req.query.name} desde Express`);
});

app.post('/saludo',function(req,res) {
    res.send(`Hola ${req.body.name} desde Express con metodo post`);
})

app.listen(3000);