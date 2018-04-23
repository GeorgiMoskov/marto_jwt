const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./http/routes/auth.routes');

const config = require('./config/app.config');

const strategy = require('./config/jwt-strategy');

const app = express();

const users = [];
// Optional user for test
// {
//     email: 'a@a.bg',
//     password: '$2a$10$POBjXyx32pMAd2zfqwmMBuWB./fQ5M1SAkVBbi6e4FMEY9/VmrBfG'
// }


app.use(cors());
app.use(bodyParser.json());

passport.use('jwt',strategy.init(users));
//ako suzdadem oshte edna strategiq , moje da q vurjem kato jwt-admim.
//tq ot svoq strana kato primer moje da ima oshte proverki
//passport.use('jwt-admin',strategy.initAdmin(users));

app.use('/', authRoutes.create({users}));

app.get('/test', passport.authenticate('jwt', { session: false }), (req, res)=>{
    console.log('...................');
    console.log(req.user);
    res.send({authenticated: true});
})

app.listen(config.PORT, function(){
    console.log(`App listening on port ${config.PORT}!`);
})