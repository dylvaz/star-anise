const createProxyMiddleware = require('http-proxy-middleware');

const filter = (pathname, req) => {
  if (pathname.match('^/(auth|logout|whoami)')) {
    return true;
  }

  return pathname.match('^/(login|signup)') && req.method === 'POST';
};

module.exports = (app) => {
  app.use(createProxyMiddleware(filter, { target: 'http://localhost:5000' }));
};
