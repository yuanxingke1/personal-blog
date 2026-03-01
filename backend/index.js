const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS 配置 - 允许前端域名
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://frontend-wheat-phi-63.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // 允许没有 origin 的请求（如 Postman、服务器间请求）
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    return callback(null, true); // 暂时允许所有源，上线稳定后可改为拒绝
  },
  credentials: true
}));
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