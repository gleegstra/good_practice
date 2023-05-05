const dotenv = require('dotenv'); //llamo libreria
const path = require('path'); //llamo libreria

//configuro la ruta donde estan los archivos con las variables de entorno
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

//exporto las variables para poder utilizar
module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    STR_CONN: process.env.STR_CONN
}