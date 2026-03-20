const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

/**
 * GET /api/dashboard - 获取仪表盘统计数据
 */
router.get('/dashboard', (req, res) => {
  res.success({
    totalUsers: 1256,
    totalOrders: 8934,
    totalRevenue: 2456789.50,
    todayOrders: 156,
    pendingOrders: 23,
    trend: [
      { date: '2025-03-14', orders: 120, revenue: 45600 },
      { date: '2025-03-15', orders: 135, revenue: 52300 },
      { date: '2025-03-16', orders: 98, revenue: 38900 },
      { date: '2025-03-17', orders: 167, revenue: 67800 },
      { date: '2025-03-18', orders: 145, revenue: 58200 },
      { date: '2025-03-19', orders: 178, revenue: 72100 },
      { date: '2025-03-20', orders: 156, revenue: 63400 },
    ],
  });
});

// 挂载子路由
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

module.exports = router;