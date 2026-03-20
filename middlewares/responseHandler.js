/**
 * 统一响应格式中间件
 * 将 res.success 和 res.error 注入到响应对象中
 */
const responseHandler = (req, res, next) => {
  res.success = (data, message = 'success', code = 200) => {
    res.status(code).json({
      code,
      message,
      data,
      timestamp: Date.now(),
    });
  };

  res.fail = (message = 'error', code = 500, data = null) => {
    res.status(code).json({
      code,
      message,
      data,
      timestamp: Date.now(),
    });
  };

  next();
};

module.exports = responseHandler;