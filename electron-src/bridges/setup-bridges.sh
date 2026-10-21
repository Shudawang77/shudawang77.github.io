#!/bin/bash
# Setup script: creates the electron bridge modules in node_modules
DIR="$(cd "$(dirname "$0")/../.." && pwd)"

# Create bridge directories if they don't exist
mkdir -p "$DIR/node_modules/electron/main"
mkdir -p "$DIR/node_modules/electron/common"  
mkdir -p "$DIR/node_modules/electron/renderer"

# Copy bridge files
cp "$DIR/electron-src/bridges/electron-main/index.js" "$DIR/node_modules/electron/main/index.js"
cp "$DIR/electron-src/bridges/electron-common/index.js" "$DIR/node_modules/electron/common/index.js"
cp "$DIR/electron-src/bridges/electron-renderer/index.js" "$DIR/node_modules/electron/renderer/index.js"

echo "Bridges installed."
