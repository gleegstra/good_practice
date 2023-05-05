const express = require('express');
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
    name: 'session', // nombre de la sesion
    /*
    Se pasan las llaves para encriptar y verificar las cookies
    */
    keys:['fdsafa12343fsdf','w4534fcsdaffsd']
    
})); // se usa la cookieSession como middleware

app.get('/',function(req,res) {
    req.session.visits = (req.session.visits||0) + 1;

    res.send(`${req.session.visits} visita(s)`);
});

app.listen(3000);