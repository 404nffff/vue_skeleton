import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// 从环境变量中获取 MySQL 配置
const { MOCK_MYSQL_HOST, MOCK_MYSQL_USER, MOCK_MYSQL_PASSWORD, MOCK_MYSQL_DATABASE, MOCK_MYSQL_PORT } = process.env;

// 如果未配置 MySQL，则不启用 MySQL 相关功能
const isMysqlEnabled = MOCK_MYSQL_HOST && MOCK_MYSQL_USER && MOCK_MYSQL_PASSWORD && MOCK_MYSQL_DATABASE && MOCK_MYSQL_PORT;

let connectionConfig;

if (isMysqlEnabled) {
  connectionConfig = {
    host: MOCK_MYSQL_HOST,
    user: MOCK_MYSQL_USER,
    password: MOCK_MYSQL_PASSWORD,
    database: MOCK_MYSQL_DATABASE,
    port: MOCK_MYSQL_PORT
  };
}

// 根据 MySQL 数据类型生成 mock.js 模板
const typeMapping = {
  'int': '@integer(1, 100)',
  'tinyint': '@integer(0, 1)',
  'varchar': '@string("lower", 5, 10)',
  'text': '@paragraph',
  'date': '@date("yyyy-MM-dd")',
  'datetime': '@datetime',
  // 你可以根据需要添加更多的类型映射
};

// 获取 MySQL 表字段并生成 mock.js 模板
export const getTableMockTemplate = async (tableName) => {
  if (!isMysqlEnabled) {
    throw new Error('MySQL is not enabled.');
  }
  
  const connection = await mysql.createConnection(connectionConfig);
  const [rows] = await connection.execute(`DESCRIBE ${tableName}`);
  await connection.end();

  const mockTemplate = {};
  let idCounter = 1;

  rows.forEach(row => {
    const dataType = row.Type.split('(')[0]; // 获取字段类型
    if (row.Field.toLowerCase() === 'id') {
      mockTemplate[row.Field] = () => idCounter++;
    } else {
      mockTemplate[row.Field] = typeMapping[dataType] || '@string';
    }
  });

  return mockTemplate;
};
