const express = require('express');

let registrationsController = require('../controllers/registrations');
let router = express.Router();

router.route('/users')
    .get( registrationsController.new)
    .post(registrationsController.create);

module.exports = router;