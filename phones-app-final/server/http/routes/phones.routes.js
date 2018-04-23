const express = require('express');

const phonesController = require('./../../controllers/phones.controller');

const router = express.Router();

const create = function ({ phones }) {

    const controller = phonesController.create(phones);
    router.get('/api/phones', controller.all());
    
    router.get('/api/phones/:brand', controller.getByBrand());

    return router;
}

module.exports = {
    create
};