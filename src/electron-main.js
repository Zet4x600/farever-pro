
const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 440,
    height: 700,
    backgroundColor: '#0a0910',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      devTools: false
    },
    autoHideMenuBar: true,
    resizable: false,
    alwaysOnTop: true,
    title: "FAREVER PRO | Advanced Modding Dashboard",
    show: false
  });

  // Utilizza la porta 9005 configurata in package.json
  const targetUrl = 'http://localhost:9005';

  const loadApp = () => {
    win.loadURL(targetUrl)
      .then(() => {
        win.show();
      })
      .catch((err) => {
        console.log("Server non pronto sulla porta 9005, riprovo tra 2 secondi...");
        setTimeout(loadApp, 2000);
      });
  };

  loadApp();

  win.on('closed', () => {
    win = null;
  });
}

const isFirstInstance = app.requestSingleInstanceLock();

if (!isFirstInstance) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.whenReady().then(createWindow);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
