const express = require('express');
let tasksController = require('../controllers/tasks');

let router = express.Router();

router.route('/tasks').get(tasksController.list).post(tasksController.create);

//La ruta de la plantilla para la carga de tareas debe estar primero que el de la card de la tarea
router.get('/tasks/new',tasksController.new); 

router.route('/tasks/:id').get(tasksController.show).put(tasksController.update).delete(tasksController.delete); //wildcard

module.exports = router;