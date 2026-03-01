# 个人博客部署说明

## 项目结构

```
blog/
├── frontend/           # 前端代码
│   ├── src/
│   │   ├── components/  # 组件
│   │   ├── pages/       # 页面
│   │   ├── lib/         # 工具库
│   │   └── assets/      # 静态资源
│   ├── public/          # 静态资源
│   └── dist/            # 构建产物
├── backend/            # 后端代码
│   ├── routes/          # API 路由
│   ├── models/          # 数据库模型
│   └── blog.db          # SQLite 数据库
└── DEPLOY.md           # 部署说明
```

## 环境要求

### 前端
- Node.js 18+
- npm 9+

### 后端
- Node.js 18+
- SQLite 3

## 部署步骤

### 1. 前端部署

#### 开发环境
```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 访问 http://localhost:5173
```

#### 生产环境
```bash
# 构建生产版本
npm run build

# 部署 dist 目录到静态网站托管服务
# 例如 Nginx、Vercel、Netlify 等
```

### 2. 后端部署

#### 开发环境
```bash
# 进入后端目录
cd backend

# 安装依赖
npm install

# 启动开发服务器
node index.js
# 服务运行在 http://localhost:3001
```

#### 生产环境
```bash
# 安装 PM2 进程管理器
npm install -g pm2

# 启动后端服务
node index.js

# 或使用 PM2
npm run pm2-start

# 查看服务状态
npm run pm2-status
```

## API 接口

### 健康检查
- **GET** `/api/health` - 检查后端服务状态

### 文章管理
- **GET** `/api/articles` - 获取文章列表
- **GET** `/api/articles/:id` - 获取单个文章
- **POST** `/api/articles` - 创建文章
- **PUT** `/api/articles/:id` - 更新文章
- **DELETE** `/api/articles/:id` - 删除文章

### 订阅者管理
- **GET** `/api/subscribers` - 获取订阅者列表
- **POST** `/api/subscribers` - 添加订阅者
- **POST** `/api/subscribers/unsubscribe` - 取消订阅
- **DELETE** `/api/subscribers/:id` - 删除订阅者

## 配置说明

### 前端配置
- 后端 API 地址：`src/api/config.js`
- 主题配置：`src/components/ThemeToggle.jsx`
- 本地化配置：`src/lib/localization.js`

### 后端配置
- 端口：默认 3001（可通过环境变量 PORT 修改）
- 数据库：SQLite 本地数据库 `blog.db`

## 性能优化

1. **前端优化**
   - 图片懒加载
   - 代码分割
   - 资源预加载
   - 字体优化

2. **后端优化**
   - 数据库索引
   - 缓存策略
   - 异步处理

## 安全建议

1. **前端安全**
   - 使用 HTTPS
   - 防止 XSS 攻击
   - 防止 CSRF 攻击

2. **后端安全**
   - 输入验证
   - 防止 SQL 注入
   - API 限流
   - 错误处理

## 维护说明

1. **数据库备份**
   - 定期备份 `blog.db` 文件

2. **日志管理**
   - 查看 PM2 日志：`npm run pm2-logs`

3. **更新流程**
   - 拉取代码
   - 安装依赖
   - 构建前端
   - 重启后端服务

## 技术栈

### 前端
- React 18
- Vite 7
- Tailwind CSS 4
- React Router 6

### 后端
- Express.js
- Sequelize ORM
- SQLite 3
- CORS

## 常见问题

### 1. 前端无法连接后端 API
- 检查后端服务是否运行
- 检查 CORS 配置
- 检查 API 地址是否正确

### 2. 数据库同步失败
- 检查 SQLite 安装
- 检查数据库文件权限
- 检查模型定义是否正确

### 3. 部署到生产环境后样式丢失
- 确保 `npm run build` 成功执行
- 确保静态资源路径正确
- 检查服务器配置

## 联系信息

如有问题，请联系：
- 邮箱：admin@example.com
- 网站：https://blog.example.com