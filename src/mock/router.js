import express from 'express';
import fs from 'fs';
import path from 'path';
import Mock from 'mockjs';
import { getTableMockTemplate } from './mysql.js';

const router = express.Router();

// 定义具体的 API 路由，使用 mock.js 生成假数据
router.get('/data', (req, res) => {
  const data = Mock.mock({
    'list|10': [{
      'id|+1': 1,
      'name': '@name',
      'age|18-60': 1,
      'city': '@city'
    }]
  });
  res.json(data);
});

// 定义具体的 API 路由，读取 permissions.json
router.get('/permissions', (req, res) => {
  const filePath = path.join(process.cwd(), 'src', 'mock', 'data', 'permissions.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Failed to read permissions data', details: err.message });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// 定义 API 路由以获取表字段并生成假数据
router.get('/mock/:table', async (req, res) => {
  const tableName = req.params.table;
  try {
    const mockTemplate = await getTableMockTemplate(tableName);
    const mockData = Mock.mock({
      'data|10': [mockTemplate]
    });
    res.json(mockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 模拟分页
router.get('/page', async (req, res) => {
  const tableName = req.query.table;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const mockTemplate = await getTableMockTemplate(tableName);
    const totalRecords = 100; // 总记录数，可以根据需求调整
    const totalPages = Math.ceil(totalRecords / limit);

    const mockData = Mock.mock({
      [`data|${totalRecords}`]: [mockTemplate]
    }).data;

    const start = (page - 1) * limit;
    const end = page * limit;
    const paginatedData = mockData.slice(start, end);

    res.json({
      data: paginatedData,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 模拟编辑
router.put('/edit/:table/:id', (req, res) => {
  const { table, id } = req.params;
  const updatedData = req.body;

  // 模拟编辑操作
  res.json({
    message: `Record in table ${table} with id ${id} has been updated`,
    data: updatedData
  });
});

// 模拟删除
router.delete('/delete/:table/:id', (req, res) => {
  const { table, id } = req.params;

  // 模拟删除操作
  res.json({
    message: `Record in table ${table} with id ${id} has been deleted`
  });
});

// 动态处理所有以 /api 开头的请求
router.get('/*', (req, res) => {
  const fileName = req.path.replace('/api/', '') + '.json';
  const filePath = path.join(process.cwd(), 'src', 'mock', 'data', fileName);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.status(404).json({ error: 'File not found' });
      } else {
        res.status(500).json({ error: 'Failed to read data', details: err.message });
      }
    } else {
      res.json(JSON.parse(data));
    }
  });
});

export default router;
