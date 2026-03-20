const requestLogger = require('./requestLogger');
const responseHandler = require('./responseHandler');
const errorHandler = require('./errorHandler');
const notFoundHandler = require('./notFoundHandler');

module.exports = {
  requestLogger,
  responseHandler,
  errorHandler,
  notFoundHandler,
};