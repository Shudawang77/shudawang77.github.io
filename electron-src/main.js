// Test: in Electron, does require('electron') return the API or a path?
const electron = require('electron')
console.log('electron type:', typeof electron)
if (typeof electron === 'object') {
  console.log('electron keys:', Object.keys(electron).slice(0, 10).join(', '))
  console.log('SUCCESS! app:', typeof electron.app)
} else {
  console.log('FAILED: electron is a path string')
  console.log('Path:', electron.substring(0, 60))
}
