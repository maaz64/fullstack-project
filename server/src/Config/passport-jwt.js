require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../model/user');


const opts ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.ACCESS_TOKEN_SECRET_KEY,
}

passport.use(new JwtStrategy(opts,function(jwt_payload,done){

        
    User.findOne({id: jwt_payload.sub}).then((admin)=>{
        if (admin) {
            return done(null, admin);
        } else {
            return done(null, false);
        }
        
    }).catch((err)=>{
        return done(err, false);
        

    })
}));


module.exports = passport;