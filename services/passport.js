const passport = require('passport');
const { User } = require('../models');
const config = require('../config');
const { Stragety as JwtStrategy, ExtractJwt } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const LocalStategy = require('passport-local');

const localOptions = {
  usernameField: 'email',

};

const localLogin = new LocalStategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    user.checkPassword(password, (err, isMatch) => {
      if (err) return done(err);
      if (!isMatch) return done(null, false);
      return done(null, user);
    });
  });
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secrectOrKey: config.secret,
};

const jwtLogin = new JwtStrategy()
