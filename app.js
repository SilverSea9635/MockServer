require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const {
  requestLogger,
  responseHandler,
  errorHandler,
  notFoundHandler,
} = require('./middlewares');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// ========== 安全中间件 ==========
app.use(helmet());

// ========== 跨域配置 ==========
app.use(cors());

// ========== 请求体解析 ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== 限流配置 ==========
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 每个IP最多100次请求
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, message: 'Too many requests, please try again later.', data: null },
});
app.use('/api', limiter);

// ========== 请求日志 ==========
app.use(requestLogger);

// ========== 统一响应格式 ==========
app.use(responseHandler);

// ========== 健康检查 ==========
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// ========== API 路由 ==========
app.use('/api', apiRoutes);

// ========== 404 处理 ==========
app.use(notFoundHandler);

// ========== 全局错误处理 ==========
app.use(errorHandler);

// ========== 启动服务 ==========
app.listen(PORT, () => {
  console.log(`MockServer running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
