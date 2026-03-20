const express = require('express');
const router = express.Router();
const { products } = require('../mock-data');

/**
 * GET /api/products - 获取商品列表
 * 支持分页、分类筛选和搜索
 */
router.get('/', (req, res) => {
  const { page = 1, pageSize = 10, category, keyword } = req.query;

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (keyword) {
    filteredProducts = filteredProducts.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  const start = (Number(page) - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const list = filteredProducts.slice(start, end);

  res.success({
    list,
    total: filteredProducts.length,
    page: Number(page),
    pageSize: Number(pageSize),
  });
});

/**
 * GET /api/products/:id - 获取商品详情
 */
router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.fail('Product not found', 404);
  }
  res.success(product);
});

/**
 * GET /api/products/categories - 获取商品分类列表
 */
router.get('/meta/categories', (req, res) => {
  const categories = [...new Set(products.map((p) => p.category))];
  res.success(categories);
});

module.exports = router;