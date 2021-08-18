/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const bcrypt = require('bcrypt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const initDisplayName = require('./displayName');

const { clientID: googleClientID, clientSecret: googleClientSecret } = require('../config').googleOAuth;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      const user = await User.findOne({ 'local.email': email });
      if (!user) {
        return done(null, false, {
          message: 'Invalid email or password',
        });
      }
      const match = await bcrypt.compare(password, user.local.password);
      if (!match) {
        return done(null, false, { message: 'Invalid email or password' });
      }
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
      const user = await User.findOne({ 'google.id': profile.id });
      if (user) {
        return done(null, user);
      }

      const newUser = await new User({
        google: { id: profile.id },
        email: profile._json.email,
        displayName: initDisplayName(),
        avatar: profile._json.picture,
      }).save();

      done(null, newUser);
    },
  ),
);
