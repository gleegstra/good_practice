const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const port = 3000;
const app = express();

const sequelize = new Sequelize('postgres://prueba:prueba@localhost:5432/prueba'); //string de conexion

app.use(bodyParser.json()); //uso como middleware json

app.use(bodyParser.urlencoded({
    extended:true
})); //uso como middleware solo requests con body del tipo urlencoded

/*
Se prueba conexion con la base
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.close();
})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/
app.get('/',(req,res)=>{
    res.json({info:"Node.js, Express, Postgresql y Sequelize"});
})


app.listen(port,()=>{        
    console.log('Server arriba!!!');
});