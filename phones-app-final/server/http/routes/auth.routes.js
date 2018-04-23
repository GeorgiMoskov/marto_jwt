const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid/v4');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('./../../config/app.config');
const authController = require('./../../controllers/auth.controller');

const router = express.Router();

const create = function ({ users }) {
    // controller ima samo vde funckii register i login
    const controller = authController.create(users);

    router.post('/api/register', controller.register());

    router.post('/api/login', controller.login());

    return router;
}

module.exports = {
    create
};