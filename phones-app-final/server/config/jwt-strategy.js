const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./app.config');

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET,
    issuer: config.JWT_ISS,
    // audience: ''
}

const create = function (users) {
    return new JwtStrategy(opts, function (jwt_payload, done) {
        console.log(jwt_payload);
        let userFound = users.find(x => x.id === jwt_payload.sub);
        
        if (userFound) {
            return done(null, userFound);
        } else {
            return done('Not authenticated', false);
        }

        // Find in database
        // User.findOne({id: jwt_payload.sub jwt_payload.id}, function(err, user) {
        //     if (err) {
        //     }
        //     if (user) {
        //     } else {
        //         return done(null, false);
        //         // or you could create a new account
        //     }
        // });
    })
};

module.exports = {
    create
}