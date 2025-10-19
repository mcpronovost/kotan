const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("electronAPI", {
  showNotification: (title, body) => {
    ipcRenderer.invoke("show-notification", { title, body });
  },
});

contextBridge.exposeInMainWorld("database", {
  getVillagers: () => ipcRenderer.invoke("db-get-villagers"),
  addVillager: (name, health) => ipcRenderer.invoke("db-add-villager", { name, health }),
  removeVillager: (id) => ipcRenderer.invoke("db-remove-villager", { id }),
  updateVillagerHealth: (id, health) => ipcRenderer.invoke("db-update-villager-health", { id, health }),
  getSetting: (key) => ipcRenderer.invoke("db-get-setting", { key }),
  setSetting: (key, value) => ipcRenderer.invoke("db-set-setting", { key, value }),
});
