const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
const articleRoutes = require('./routes/articles');
const subscriberRoutes = require('./routes/subscribers');

app.use('/api/articles', articleRoutes);
app.use('/api/subscribers', subscriberRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend service is running' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // 同步数据库
  db.sequelize.sync({ alter: true })
    .then(() => {
      console.log('Database synchronized');
    })
    .catch((error) => {
      console.error('Database synchronization error:', error);
    });
});

module.exports = app;