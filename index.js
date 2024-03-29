const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const { mongoURI, cookieKey } = require('./config');
require('./models/User');
require('./services/passport');

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// when running in production, serve react build assets from our node server
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  // eslint-disable-next-line global-require
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
