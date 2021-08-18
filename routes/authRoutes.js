const passport = require('passport');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

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

  app.get('/whoami', requireAuth, (req, res) => {
    res.send(req.user);
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/login');

  app.post('/login/password',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/');
    });

  app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(400, 'email and password are required for signup');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await new User({
      local: {
        email,
        password: hashedPassword,
      },
    }).save();
    user.local.password = undefined;
    res.send(user);
  });
};
