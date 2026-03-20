const { v4: uuidv4 } = require('uuid');

// 模拟用户数据
const users = [
  { id: uuidv4(), username: 'admin', email: 'admin@example.com', role: 'admin', status: 1, createdAt: '2025-01-15T08:00:00Z' },
  { id: uuidv4(), username: 'zhangsan', email: 'zhangsan@example.com', role: 'user', status: 1, createdAt: '2025-02-20T10:30:00Z' },
  { id: uuidv4(), username: 'lisi', email: 'lisi@example.com', role: 'user', status: 0, createdAt: '2025-03-10T14:15:00Z' },
];

module.exports = users;