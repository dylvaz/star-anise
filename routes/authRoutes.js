const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const randomDisplayName = require('../services/randomDisplayName');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    },
  );

  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
    }),
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login',
    }),
  );

  app.get('/whoami', requireAuth, (req, res) => {
    res.send(req.user);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post(
    '/login/password',
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    }),
    (req, res) => {
      res.redirect('/');
    },
  );

  app.post('/signup', async (req, res) => {
    if (req.user) {
      return res.status(400).send('already signed in');
    }

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send('email and password are required for signup');
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await new User({
        local: {
          email,
          password: hashedPassword,
        },
        email,
        displayName: randomDisplayName(),
      }).save();
      user.local.password = undefined;
      res.send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
};
