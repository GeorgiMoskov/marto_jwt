const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const authRoutes = require('./http/routes/auth.routes');
const phoneRoutes = require('./http/routes/phones.routes');

const config = require('./config/app.config');

const strategy = require('./config/jwt-strategy');

const app = express();

const users = [];
// Optional user for test
// {
//     email: 'a@a.bg',
//     password: '$2a$10$POBjXyx32pMAd2zfqwmMBuWB./fQ5M1SAkVBbi6e4FMEY9/VmrBfG'
// }

const phones = [
    { brand: 'Samsung', brandImg: 'https://seeklogo.com/images/S/Samsung_Mobile-logo-D8645D09B2-seeklogo.com.png', description: 'Best camera ever', model: 'S9+', price: 899, imgUrl: 'https://cdn.shopify.com/s/files/1/1532/0057/products/Samsung-Galaxy-S9-Plus-G965F-Coral-Blue-Front.jpg?v=1521152345', specs: { displaySize: 5.8, displayType: 2 } },
    { brand: 'OnePlus', brandImg: 'https://seeklogo.com/images/O/oneplus-logo-B6703954CF-seeklogo.com.png', description: 'Bang for the bucks', model: '5T', price: 599, imgUrl: 'https://www.honorbuy.com/5483-thickbox_default/oneplus-5t-6gb-ram-64gb-rom-smartphone.jpg', specs: { displaySize: 6.0, displayType: 2 } },
    { brand: 'iPhone', brandImg: 'https://www.pchouselondon.com/wp-content/uploads/2018/02/apple.png', description: 'Notch', model: 'X', price: 999, imgUrl: 'https://cdn.macrumors.com/article-new/2017/10/iphone-x-silver.jpg', specs: { displaySize: 5.8, displayType: 2 } },
];

app.use(cors());
app.use(bodyParser.json());

passport.use(strategy.create(users));

app.use('/', authRoutes.create({users}));
app.use('/', phoneRoutes.create({phones}));


app.get('/test', passport.authenticate('jwt', { session: false }), (req, res)=>{
    res.send({authenticated: true});
})

app.listen(config.PORT, function(){
    console.log(`App listening on port ${config.PORT}!`);
})