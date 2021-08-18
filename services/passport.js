/* eslint-disable consistent-return */
const passport = require('passport');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { googleClientID, googleClientSecret } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      const user = await User.findOne({ loginUsername: username });
      if (!user) {
        return done(null, false, {
          message: 'Invalid email or password',
        });
      }
      bcrypt.compare(password, user.loginPassword, (err, isMatch) => {
        if (err || !isMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }
      });
      return done(null, user);
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true, // required for heroku
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleID: profile.id });
      if (user) {
        return done(null, user);
      }
      const newUser = await new User({
        googleID: profile.id,
        displayName: profile.displayName,
        imageUrl: profile.photos[0].value,
      }).save();
      done(null, newUser);
    },
  ),
);
