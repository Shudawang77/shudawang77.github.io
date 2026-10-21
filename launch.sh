#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
ELECTRON="$DIR/.electron-runtime/dist/Electron.app/Contents/MacOS/Electron"

if [ ! -f "$ELECTRON" ]; then
  echo "❌ Electron 未找到，请先运行 npm install"
  exit 1
fi

# 启动 Electron — electron 包不在 node_modules 中
# 因此import('electron/main')不会被拦截
cd "$DIR"
"$ELECTRON" .
