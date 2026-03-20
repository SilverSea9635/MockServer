const express = require('express');
const router = express.Router();
const { users } = require('../mock-data');

/**
 * GET /api/users - 获取用户列表
 * 支持分页和状态筛选
 */
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, status } = req.query;

  let filteredUsers = [...users];
  if (status !== undefined) {
    filteredUsers = filteredUsers.filter((u) => u.status === Number(status));
  }

  const start = (Number(page) - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const list = filteredUsers.slice(start, end);

  res.success({
    list,
    total: filteredUsers.length,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

/**
 * GET /api/users/:id - 获取用户详情
 */
router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.fail('User not found', 404);
  }
  res.success(user);
});

/**
 * POST /api/users/login - 用户登录
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.fail('Username and password are required', 400);
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.fail('Invalid credentials', 401);
  }

  // 模拟登录成功返回 token
  res.success({
    token: 'mock-jwt-token-' + Date.now(),
    user,
  }, 'Login successful');
});

module.exports = router;