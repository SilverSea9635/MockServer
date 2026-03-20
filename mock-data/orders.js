const { v4: uuidv4 } = require('uuid');

// 模拟订单数据
const orders = [
  {
    id: uuidv4(),
    orderNo: 'ORD20250320001',
    userId: 'user-001',
    items: [{ name: 'iPhone 16 Pro', quantity: 1, price: 8999 }],
    totalAmount: 8999,
    status: 'completed',
    createdAt: '2025-03-20T09:00:00Z',
  },
  {
    id: uuidv4(),
    orderNo: 'ORD20250320002',
    userId: 'user-002',
    items: [{ name: 'AirPods Pro 3', quantity: 2, price: 1899 }],
    totalAmount: 3798,
    status: 'pending',
    createdAt: '2025-03-20T11:30:00Z',
  },
  {
    id: uuidv4(),
    orderNo: 'ORD20250319001',
    userId: 'user-001',
    items: [{ name: 'JavaScript高级程序设计', quantity: 1, price: 129 }],
    totalAmount: 129,
    status: 'shipped',
    createdAt: '2025-03-19T16:45:00Z',
  },
];

module.exports = orders;