/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const randomAnimalName = require('random-animal-name');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const { clientID: googleClientID, clientSecret: googleClientSecret } = require('../config').googleOAuth;

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user));
});

// passport.use(
//   new LocalStrategy(
//     async (username, password, done) => {
//       const user = await User.findOne({ loginUsername: username });
//       if (!user) {
//         return done(null, false, {
//           message: 'Invalid email or password',
//         });
//       }
//       bcrypt.compare(password, user.loginPassword, (err, isMatch) => {
//         if (err || !isMatch) {
//           return done(null, false, { message: 'Invalid email or password' });
//         }
//       });
//       return done(null, user);
//     },
//   ),
// );

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

      const initialName = `${randomAnimalName().toLowerCase().replace(' ', '')}${Math.floor(Math.random() * 999)}`;
      const newUser = await new User({
        google: { id: profile.id },
        email: profile._json.email,
        displayName: initialName,
        avatar: profile._json.picture,
      }).save();

      done(null, newUser);
    },
  ),
);
