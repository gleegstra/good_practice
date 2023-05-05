const express = require('express');

let categoriesController = require('../controllers/categories');

let router = express.Router();

router.route('/categories').get(categoriesController.list).post(categoriesController.create);

router.get('/categories/new',categoriesController.new);

router.route('/categories/:id').get(categoriesController.edit).put(categoriesController.update).delete(categoriesController.delete);

module.exports = router;