const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['/logout', '/login', '/signup', '/whoami', '/auth'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    }),
  );
};
