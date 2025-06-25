# 使用 Node.js 官方镜像作为基础镜像
FROM node:18-alpine

# 创建工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install pnpm -g

# 

RUN pnpm install 

# 复制项目文件
COPY . .

# 构建项目
RUN npm run build

# 全局安装 PM2
RUN npm install pm2 -g

# 暴露端口（根据你的 NestJS 应用配置）
EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "start", "dist/main.js"]