// Patches the module system before the app loads
const Module = require('module');
const path = require('path');
const fs = require('fs');

// The REAL electron API comes from the Electron binary's builtin modules:
// electron/js2c/browser_init (for main process)
// These are listed in Module.builtinModules

// The issue is that node_modules/electron blocks require('electron') 
// AND blocks require('electron/main') because there's no 'main/' directory

// Create 'electron/main' as a virtual module that loads from the builtin
// This is the bridge we need

const electronDir = path.join(process.cwd(), 'node_modules', 'electron');
if (fs.existsSync(electronDir)) {
  // Create the missing sub-path modules
  fs.mkdirSync(path.join(electronDir, 'main'), { recursive: true });
  fs.mkdirSync(path.join(electronDir, 'common'), { recursive: true });
  fs.mkdirSync(path.join(electronDir, 'renderer'), { recursive: true });
  
  // electron/main/index.js: loads the real API
  // The real electron module is in the binary as builtins
  // but accessing them directly crashes
  // So we use a clever approach: the binary has registered the electron 
  // API via special bindings

  // Write bridge files that use process._linkedBinding
  const mainBridge = `
// Bridge to real Electron main process API
// The Electron binary provides these via special bindings
const Module = require('module');

// Access the real electron module through the binary's internal APIs
// The electron module IS available as a builtin: electron/js2c/browser_init
// But it needs to be loaded in the correct context

// Use a different approach: the electron binary sets up the module
// through the 'atom' bindings internally

// Try: the global process has electron bindings
let electronModule = null;

// Check if electron module is available through the special binding
try {
  // This binding was registered during Electron's main process init
  const binding = process._linkedBinding('electron_common_features');
  // But this only gives features, not the full API
} catch(e) {}

// Access through the original require mechanism  
// First, let's find the electron module in require.cache
const cacheEntry = Object.entries(require.cache).find(([k]) => 
  k.includes('electron') && !k.includes('bridge') && !k.includes('node_modules/electron/index')
);

if (cacheEntry) {
  module.exports = cacheEntry[1].exports;
} else {
  // Try to load the built-in browser_init safely
  try {
    const electronBuiltin = require('electron/js2c/browser_init');
    module.exports = electronBuiltin;
  } catch(e) {
    console.error('Failed to load electron/main bridge:', e.message);
    // Last resort: the electron binary should have exported the module
    // when it loaded the app. Check if it's in the global scope.
    if (typeof global.__electron_main__ !== 'undefined') {
      module.exports = global.__electron_main__;
    }
  }
}
`;
  
  fs.writeFileSync(path.join(electronDir, 'main', 'index.js'), mainBridge);
  fs.writeFileSync(path.join(electronDir, 'main', 'package.json'), '{"main":"index.js","type":"commonjs"}');
  
  // electron/common/index.js - re-exports from main
  // Many common APIs are also in the main export
  const commonBridge = `
// electron/common bridge
// In Electron's architecture, common APIs are part of the main module
// They're also accessible through the builtin
module.exports = require('electron/main');
`;
  fs.writeFileSync(path.join(electronDir, 'common', 'index.js'), commonBridge);
  fs.writeFileSync(path.join(electronDir, 'common', 'package.json'), '{"main":"index.js","type":"commonjs"}');

  // electron/renderer/index.js
  const rendererBridge = `
// electron/renderer bridge
const Module = require('module');
try {
  const rendererBuiltin = require('electron/js2c/renderer_init');
  module.exports = rendererBuiltin;
} catch(e) {
  module.exports = require('electron/main');
}
`;
  fs.writeFileSync(path.join(electronDir, 'renderer', 'index.js'), rendererBridge);
  fs.writeFileSync(path.join(electronDir, 'renderer', 'package.json'), '{"main":"index.js","type":"commonjs"}');
  
  console.log('Bridge modules installed in node_modules/electron/');
}
