const electron = require('electron')
console.log('electron type:', typeof electron)
if (typeof electron === 'string') {
  console.log('Got path string:', electron.substring(0, 60))
  // Try electron/main
  const em = require('electron/main')
  console.log('electron/main:', typeof em)
  if (em && em.app) {
    console.log('SUCCESS with electron/main!')
  }
}
