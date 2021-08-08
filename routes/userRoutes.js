const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');

module.exports = (app) => {
  app.post('/api/currentUser/changeUsername', requireAuth, async (req, res) => {
    req.user.username = req.body.username;
    res.send(await req.user.save());
  });
};
