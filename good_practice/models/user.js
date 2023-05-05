'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task,{
        as: 'tasks',
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false},
    password_hash: DataTypes.STRING,
    //Creo propiedad virtual (no se guarda en bbdd para hashearla)
    password: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'User',
  });

  //Hago uso del prototype de User para extender funcionabilidad
  User.prototype.authenticatePassword = function(password) {
    //Creo una promesa ya que el comparar hash es un metodo asincrono
    return new Promise((res,rej)=>{
      bcrypt.compare(password,this.password_hash,function(err,valid){
        if(err) return rej(err);
        res(valid)
      })
    })
  }
  //declaro metodo login asincrono que retorna una promesa para validar usuario y password
  User.login = async function (email, password) {
    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (!user) return null;
    const valid = await user.authenticatePassword(password);
    return valid ? user : null;
  }
  //Utilizo el hooks (similar a señal) para hashear la password antes de guardar el usuario en bbdd
  User.beforeCreate(function(user,options) {
    //Creo una promesa ya que el hasheo es un metodo asincrono
    return new Promise((res,rej)=>{
      if (user.password) {
        bcrypt.hash(user.password,10,function(error, hash) {
          user.password_hash = hash;
          res();
        });      
      }
    });
  });
  return User;
};