const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { orders: mockOrders } = require('../mock-data');

// 内存中的订单数据（允许修改）
let orders = [...mockOrders];

/**
 * GET /api/orders - 获取订单列表
 * 支持分页和状态筛选
 */
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, status, userId } = req.query;

  let filteredOrders = [...orders];

  if (status) {
    filteredOrders = filteredOrders.filter((o) => o.status === status);
  }

  if (userId) {
    filteredOrders = filteredOrders.filter((o) => o.userId === userId);
  }

  // 按创建时间倒序
  filteredOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const start = (Number(page) - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const list = filteredOrders.slice(start, end);

  res.success({
    list,
    total: filteredOrders.length,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

/**
 * GET /api/orders/:id - 获取订单详情
 */
router.get('/:id', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.fail('Order not found', 404);
  }
  res.success(order);
});

/**
 * POST /api/orders - 创建订单
 */
router.post('/', (req, res) => {
  const { items, userId } = req.body;

  if (!items || !items.length) {
    return res.fail('Order items are required', 400);
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const newOrder = {
    id: uuidv4(),
    orderNo: 'ORD' + Date.now(),
    userId: userId || 'anonymous',
    items,
    totalAmount,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);

  res.success(newOrder, 'Order created successfully', 201);
});

/**
 * PUT /api/orders/:id/cancel - 取消订单
 */
router.put('/:id/cancel', (req, res) => {
  const order = orders.find((o) => o.id === req.params.id);
  if (!order) {
    return res.fail('Order not found', 404);
  }

  if (order.status !== 'pending') {
    return res.fail('Only pending orders can be cancelled', 400);
  }

  order.status = 'cancelled';
  res.success(order, 'Order cancelled successfully');
});

module.exports = router;