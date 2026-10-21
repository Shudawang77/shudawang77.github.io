// Tom & Jerry 工作台 — Preload 脚本 (ESM)
import { ipcRenderer, contextBridge } from 'electron/renderer'

contextBridge.exposeInMainWorld('electronAPI', {
  openExternal: (url) => ipcRenderer.invoke('open-external', url),
  sendNotification: (opts) => ipcRenderer.invoke('send-notification', opts),
  getDesktopPath: () => ipcRenderer.invoke('get-desktop-path'),
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
})
