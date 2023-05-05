
//llamo al config.js
const config = require('./config/config'); 

//llamo librerias
const express = require('express'); 
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSessions = require('express-session');
const socketio = require('socket.io');

const tasksRouters = require('./routes/tasks_routes');
const registrationsRouters = require('./routes/registrations_routes');
const sessionsRouters = require('./routes/sessions_routes');
const categoriesRoutes = require('./routes/categories_routes');

const findUserMiddleware = require('./middleware/find_user');
const authUserMiddleware = require('./middleware/auth_user');

const app = express();

//Seteo motor de paginas
app.set("view engine", "pug");

//Agrego al stack el middleware utilizara formato urlencoded
app.use(bodyParser.urlencoded({
    extended:true
})); 

//Agrego al stack el middleware la utilizacion de sesiones
app.use(expressSessions({
    secret:['12846345fasdfasf','sadfasfa135843'],
    saveUninitialized: false,
    resave: false
}));

//Agrego al stack el middleware utilizara sobre escritura en verbos HTML
app.use(methodOverride('_method'));

//Agrego al stack el mi propio middleware que busca usuario 
app.use(findUserMiddleware);
app.use(authUserMiddleware);

//Agrego al stack las rutas
app.use(tasksRouters);
app.use(registrationsRouters);
app.use(sessionsRouters);
app.use(categoriesRoutes);

app.get('/',(req,res)=>{
    res.render('index',{user: req.user});
});

//Se pone en escucha a la app en el puerto y host que se pasan como argumentos
let server = app.listen(config.PORT,config.HOST, ()=>{
    console.log(`Servidor arriba!!! - Escuchando por http://${config.HOST}:${config.PORT}`);
});
let io = socketio(server);
let usersCount=0;
let sockets = {};

io.on('connection',function(socket) {
    
    let userId = socket.request._query.loggeduser;
    if (userId) sockets[userId]=socket;

    //Actualiza el usuario en tiempo real
    usersCount++;

    io.emit('count_updated',{count:usersCount});
    
    socket.on('new_task',function(data){
        if(data.userId){
            let userSocket = sockets[data.userId];
            if(!userSocket) return;

            userSocket.emit('new_task',data);
        }
    })

    socket.on('disconnect',function() {

        Object.keys(sockets).forEach(userId=>{
            let s = sockets[userId];
            if(s.id === socket.id) sockets[userId]=null; 
        })

        usersCount--;
        io.emit('count_updated',{count:usersCount});
    });
});

const client = require('./realtime/client');