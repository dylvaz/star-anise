const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    ['logout', 'login', 'signup', '/whoami', '/auth/google', '/auth/facebook'],
    createProxyMiddleware({
      target: 'http://localhost:5000',
    }),
  );
};
