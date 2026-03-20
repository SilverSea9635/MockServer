const { v4: uuidv4 } = require('uuid');

// 模拟商品数据
const products = [
  { id: uuidv4(), name: 'iPhone 16 Pro', price: 8999, category: 'electronics', stock: 150, sales: 2300 },
  { id: uuidv4(), name: 'MacBook Pro M4', price: 14999, category: 'electronics', stock: 80, sales: 1200 },
  { id: uuidv4(), name: 'AirPods Pro 3', price: 1899, category: 'electronics', stock: 500, sales: 5600 },
  { id: uuidv4(), name: 'JavaScript高级程序设计', price: 129, category: 'books', stock: 300, sales: 890 },
  { id: uuidv4(), name: 'React实战指南', price: 89, category: 'books', stock: 200, sales: 456 },
];

module.exports = products;