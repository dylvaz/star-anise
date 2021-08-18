module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must be logged in!' });
  }
  if (req.user.local) {
    req.user.local.password = undefined;
  }
  return next();
};
