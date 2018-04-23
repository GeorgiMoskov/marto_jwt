const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid/v4');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('./../config/app.config');

const create = function (phones) {

    const all = function () {
        return function(req, res){
            res.status(200).send(phones);
        };
    }

    const getByBrand = function () {
        return function(req, res){
            const brand = req.params.brand;
            res.status(200).send(phones.find(x=>x.brand == brand));
        };
    }

    return {
        all,
        getByBrand
    }
}

module.exports = {
    create
}