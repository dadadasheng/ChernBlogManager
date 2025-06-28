# 使用 Node.js 构建阶段
FROM node:lts AS build
WORKDIR /app

# 安装依赖
COPY package.json package-lock.json ./
RUN npm install

# 复制项目文件并构建
COPY . .
RUN npm run build

# 使用 Nginx 运行静态文件
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
