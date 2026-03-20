/**
 * 404 处理中间件
 */
const notFoundHandler = (req, res) => {
  res.status(404).json({
    code: 404,
    message: `Route ${req.method} ${req.path} not found`,
    data: null,
    timestamp: Date.now(),
  });
};

module.exports = notFoundHandler;