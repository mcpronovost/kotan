const { app, BrowserWindow, globalShortcut, ipcMain, Notification } = require("electron");
const path = require("node:path");
const DatabaseService = require("./database");

const isDev = !app.isPackaged;

// Initialize database service
const dbService = new DatabaseService();

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    minWidth: 800,
    height: 768,
    minHeight: 600,
    // frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.setMenuBarVisibility(false);
  // win.maximize();
  // win.setFullScreen(true);

  if (isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
};

app.on("ready", () => {
  // Initialize database
  dbService.initialize();
  
  createWindow();

  globalShortcut.register("Escape", () => {
    app.quit();
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// IPC handlers
ipcMain.handle("show-notification", (event, { title, body }) => {
  new Notification({ title, body }).show();
});

// Database IPC handlers
ipcMain.handle("db-get-villagers", () => {
  return dbService.getAllVillagers();
});

ipcMain.handle("db-add-villager", (event, { name, health }) => {
  return dbService.addVillager(name, health);
});

ipcMain.handle("db-remove-villager", (event, { id }) => {
  return dbService.removeVillager(id);
});

ipcMain.handle("db-update-villager-health", (event, { id, health }) => {
  return dbService.updateVillagerHealth(id, health);
});

ipcMain.handle("db-get-setting", (event, { key }) => {
  return dbService.getSetting(key);
});

ipcMain.handle("db-set-setting", (event, { key, value }) => {
  return dbService.setSetting(key, value);
});

app.on("browser-window-focus", () => {
  globalShortcut.register("Escape", () => {
    app.quit();
  });
});

app.on("browser-window-blur", () => {
  globalShortcut.unregisterAll();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
  // Close database connection
  dbService.close();
});

app.on("window-all-closed", () => {
  app.quit();
});
