const bcrypt = require('bcrypt-nodejs');
const uuid = require('uuid/v4');
const jwt = require('jwt-simple');
const moment = require('moment');

const config = require('./../config/app.config');

// users sa vsichkite user-i 
const create = function (users) {

    const login = function () {

        return function (req, res) {
            console.log('loginnnn');
            //tursin user sus sushtiq e-mail kato v req-sta
            let userFound = users.find(x => x.email == req.body.email);
            console.log(userFound);
            if (userFound) {
                // sravnqvame kriptiranite paroli na namereniq uzer i na user-a v req-sta
                bcrypt.compare(req.body.password, userFound.password, function (err, response) {
                    // ako parolite suvpadat suzdavame nov token
                    // payload sa dannite koito shte sudurja tokena
                    if (response) {
                        const expire = moment(new Date()).add(config.JWT_EXPIRE_TIME, 'seconds').unix();
                        let payload = {
                            sub: userFound.id,
                            email: userFound.email,
                            password: userFound.password,
                            exp: expire,
                            iss: config.JWT_ISS
                        }

                        const secret = config.JWT_SECRET;

                        const token = jwt.encode(payload, secret);
                        // izprashtame token-a na front-end-a
                        res.status(200).send({
                            token: token
                        });
                    } else {
                        console.log('greshkaaa');
                        res.status(401).send({
                            err: 'wrong pass'
                        })
                    }
                });
            } else {
                return res.status(401).send({
                    err: 'User already exist'
                });
            }
        }
    }

    const register = function () {
        return function (req, res) {
            // proverqvame dali veche ima user s takuv e-mail
            let userFound = users.find(x => x.email == req.body.email);
            if (!userFound) {
                // ako nqma takuv user , suzdavame nov , kato za id mu davame random uuid string
                let user = {
                    id: uuid(),
                    email: req.body.email,
                    password: ''
                }
                // kriptirame parolata s bcrypt
                bcrypt.hash(req.body.password, null, null, (err, hash) => {
                    user.password = hash;
                })
                // dobavqme noviq user v masiva s vsichki user-i.
                // predpolagam tuka trqbva da sedobavi user-a v bazata.
                console.log(req.body);
                console.log('asd');
                users.push(user);
                
                res.status(200).send({});
            } else {
                res.status(401).send({
                    err: 'User already exist'
                });
            }
        }
    }

    return {
        login,
        register
    }
}

module.exports = {
    create
}