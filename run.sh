#!/bin/bash
DIR="$(cd "$(dirname "$0")" && pwd)"
ELECTRON="$DIR/.electron-runtime/dist/Electron.app/Contents/MacOS/Electron"

if [ ! -f "$ELECTRON" ]; then
  # Try node_modules location
  ELECTRON="$DIR/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron"
fi

if [ ! -f "$ELECTRON" ]; then
  echo "❌ Electron 未找到"
  exit 1
fi

"$ELECTRON" "$DIR/electron-src/main.mjs"
