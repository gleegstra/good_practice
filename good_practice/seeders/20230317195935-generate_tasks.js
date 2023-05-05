'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Tasks', [
        {
          id:2,
          description:'Tarea Dos',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:3,
          description:'Tarea Tres',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {          
          id:4,
          description:'Tarea Cuarto',
          createdAt: new Date(),
          updatedAt: new Date()}
      ], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
