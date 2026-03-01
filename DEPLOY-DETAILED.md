# 详细部署指南

## 后端部署（Render）

### 1. 登录 Render
- 访问 [Render](https://render.com/)
- 点击 "Sign Up" 或 "Log In"
- 使用 GitHub 账号登录（推荐）

### 2. 创建 Web Service
1. 登录后，点击左上角的 "New" 按钮
2. 选择 "Web Service"
3. 在 "Connect a repository" 部分，选择你的 GitHub 仓库 `yuanxingke1/personal-blog`
4. 点击 "Connect"

### 3. 配置服务
在 "Configure your service" 页面，填写以下信息：

- **Name**: personal-blog-backend
- **Region**: Oregon (US West) - 选择离你最近的区域
- **Branch**: main
- **Root Directory**: `backend` （重要：必须设置为 backend）
- **Environment**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free （免费额度足够）
- **Auto-Deploy**: Enable （启用自动部署）

### 4. 部署
- 点击 "Create Web Service"
- Render 会自动开始构建和部署过程
- 等待部署完成，大约需要 2-5 分钟

### 5. 获取后端 URL
- 部署完成后，在 Render 服务页面，你会看到一个 URL（例如：`https://personal-blog-backend.onrender.com`）
- 复制这个 URL，稍后需要在 Vercel 中配置

## 前端配置（Vercel）

### 1. 登录 Vercel
- 访问 [Vercel](https://vercel.com/)
- 使用 GitHub 账号登录

### 2. 找到你的项目
- 在 Dashboard 中找到 `frontend` 项目
- 点击项目进入详情页

### 3. 配置环境变量
- 点击顶部的 "Settings" 标签
- 点击左侧的 "Environment Variables"
- 点击 "Add New"
- 填写：
  - **Key**: `REACT_APP_API_URL`
  - **Value**: 你的 Render 后端 URL（例如：`https://personal-blog-backend.onrender.com`）
  - **Environment**: Production
- 点击 "Save"

### 4. 重新部署
- 点击顶部的 "Deployments" 标签
- 点击 "Redeploy" 按钮
- 选择 "Redeploy with existing Build Cache"
- 等待部署完成

## 测试和验证

### 1. 测试后端 API
- 在浏览器中访问：`https://your-backend.onrender.com/api/health`
- 应该看到：`{"status":"ok","message":"Backend service is running"}`

### 2. 测试前端
- 访问你的 Vercel 前端 URL（例如：`https://frontend-wheat-phi-63.vercel.app`）
- 检查：
  - 页面是否正常加载
  - 文章列表是否显示
  - 暗黑模式切换是否正常
  - 响应式布局是否正常

### 3. 测试订阅功能
- 导航到 "订阅" 页面
- 输入邮箱地址进行订阅
- 检查是否收到成功提示

## 常见问题和解决方案

### 1. 前端无法连接后端
- 检查 `REACT_APP_API_URL` 环境变量是否正确
- 检查 Render 后端是否正在运行
- 检查后端 CORS 配置是否正确

### 2. 后端部署失败
- 检查构建日志，查看具体错误
- 确保 `package.json` 中的依赖配置正确
- 确保启动命令正确

### 3. 数据库问题
- Render 上的 SQLite 数据库会在服务重启时重置
- 生产环境建议使用 PostgreSQL

### 4. 部署时间过长
- 首次部署可能需要较长时间，后续部署会更快
- 检查依赖安装是否正常

## 维护和更新

### 更新代码
1. 在本地修改代码
2. 提交并推送到 GitHub
3. Vercel 和 Render 会自动重新部署

### 监控服务
- Vercel 提供部署日志和访问统计
- Render 提供服务状态和日志

### 备份数据
- 定期备份 `blog.db` 文件
- 生产环境建议使用数据库备份服务

## 联系方式

如有问题，请联系：
- 邮箱：admin@example.com
- 项目地址：https://github.com/yuanxingke1/personal-blog

---

**部署完成后，你的个人博客就完全可用了！**