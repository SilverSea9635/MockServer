const morgan = require('morgan');

// 自定义请求日志格式
const requestLogger = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    skip: (req) => req.url === '/health',
  }
);

module.exports = requestLogger;