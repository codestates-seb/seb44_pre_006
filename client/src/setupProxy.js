const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/users',  // 프록시할 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_EC2_URL,  // 실제 API 서버 주소
      changeOrigin: true,
    })
  );
  app.use(
    '/questions',  // 프록시할 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_EC2_URL,  // 실제 API 서버 주소
      changeOrigin: true,
    })
  );
  app.use(
    '/answers',  // 프록시할 경로
    createProxyMiddleware({
      target: process.env.REACT_APP_EC2_URL,  // 실제 API 서버 주소
      changeOrigin: true,
    })
  );
};