const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./app.config');

let options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
    issuer: config.JWT_ISS,
}
// strategiq za pasport js
const init = function (users) {
    // proverqva exp date na tokena , ako oshte ne e iztekul shte izpulni callback-a
    return new JwtStrategy(options, function (jwt_payload, done) {
        // dekodira tokena i veche mojem da mu vidim stoinostite
        console.log(jwt_payload);
        // tursim user chijto id e tova koeto e zakacheno v token-a
        let userFound = users.find(x => x.id === jwt_payload.sub);
        // zakachame dopulnitelni neshta kum user-a
        userFound.additional = 'something else';
        // ako token-a ne e iztekul , obache user s takova id veche ne sushtestvuva  hvurlqme greshka
        if (userFound) {
            return done(null, userFound);
        } else {
            return done('Not authenticated', false);
        }
    })
};
// druga custom strategia za proverka dali si admin
// const initAdmin = function (users) {
//     return new JwtStrategy(options, function (jwt_payload, done) {
//         console.log(jwt_payload);
//         let userFound = users.find(x => x.id === jwt_payload.sub);
//         // if admin
//         userFound.additional = 'something else';
//         if (userFound) {
//             return done(null, userFound);
//         } else {
//             return done('Not authenticated', false);
//         }
//     })
// };

module.exports = {
    init,
    initAdmin,
}