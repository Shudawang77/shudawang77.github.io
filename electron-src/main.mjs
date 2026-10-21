// Debug version - trace electron resolution
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

console.log('module.paths for main.mjs:')
const Module = require('module')

// Check where electron resolves
try {
  const resolved = Module._resolveFilename('electron', null, false)
  console.log('electron resolves to:', resolved)
} catch(e) {
  console.log('electron not found:', e.message)
}

try {
  const resolved = Module._resolveFilename('electron/main', null, false)  
  console.log('electron/main resolves to:', resolved)
} catch(e) {
  console.log('electron/main not found:', e.message)
}

// Now try the actual import
try {
  const electron = await import('electron/main')
  console.log('electron/main:', typeof electron, Object.keys(electron).slice(0,5))
} catch(e) {
  console.log('import electron/main error:', e.message)
}
