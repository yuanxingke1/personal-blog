#!/bin/bash

# 自动化部署脚本

echo "===================================="
echo "个人博客部署脚本"
echo "===================================="

echo "\n1. 检查当前状态..."
git status
git remote -v

echo "\n2. 拉取最新代码..."
git pull origin main

echo "\n3. 前端部署到 Vercel..."
cd frontend
vercel deploy --yes

cd ..
echo "\n4. 后端部署到 Render..."
echo "\n注意：Render 部署需要手动操作，步骤如下："
echo "1. 访问 https://render.com/"
echo "2. 登录 GitHub 账号"
echo "3. 点击 New → Web Service"
echo "4. 选择 yuanxingke1/personal-blog 仓库"
echo "5. 配置服务："
echo "   - Name: personal-blog-backend"
echo "   - Root Directory: backend"
echo "   - Environment: Node.js"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Instance Type: Free"
echo "6. 点击 Create Web Service"
echo "7. 部署完成后复制后端 URL"

echo "\n5. 配置前端环境变量..."
echo "\n在 Vercel 中配置："
echo "1. 访问 https://vercel.com/"
echo "2. 进入 frontend 项目"
echo "3. 点击 Settings → Environment Variables"
echo "4. 添加："
echo "   - Key: REACT_APP_API_URL"
echo "   - Value: https://your-backend.onrender.com"
echo "5. 点击 Save"

echo "\n6. 重新部署前端..."
echo "在 Vercel 中点击 Deployments → Redeploy"

echo "\n7. 测试部署..."
echo "- 后端健康检查: https://your-backend.onrender.com/api/health"
echo "- 前端访问: https://frontend-wheat-phi-63.vercel.app"

echo "\n===================================="
echo "部署脚本执行完成！"
echo "请按照上述步骤完成剩余操作。"
echo "===================================="