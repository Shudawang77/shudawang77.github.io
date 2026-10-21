#!/bin/bash
cd "$(dirname "$0")"

# 打开浏览器显示工作台
echo "🐭 鼠鼠工作台 启动中..."

# 检查是否已构建
if [ ! -f "dist/index.html" ]; then
  echo "首次运行，正在构建..."
  npx vite build
fi

# 使用 Vite 预览模式启动
npx vite preview --port 5173 --open &
PID=$!

# 等待一下让服务启动
sleep 2

echo "✅ 鼠鼠工作台已启动！"
echo "   在浏览器中打开: http://localhost:5173"
echo "   按 Ctrl+C 停止"

# 等待用户中断
trap "kill $PID 2>/dev/null; echo '鼠鼠工作台已关闭'" EXIT
wait $PID
