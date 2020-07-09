const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require ('passport-jwt').ExtractJwt;
const mongoose = require ('mongoose');
const User = mongoose.model('users'); //another way to get the user collecetion.
const keys = require ('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

//passport can locate the bearer token and can found where the secrey key is and decoding the token. Payload passport will fail if the token vaue is not correct.
module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
    .then(user=> {
      if(user) {
        return done(null, user);
      }
      return done(null, false)// if not then pass it on but false.
    })
    .catch(err => console.log(err))
  }))
}
