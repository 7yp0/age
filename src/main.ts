import { app, BrowserWindow } from 'electron';
import * as path from 'path';

import config from './config';

/* tslint:disable:no-let no-expression-statement no-if-statement */

let mainWindow: Electron.BrowserWindow | null;

function closeWindow() {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainWindow = null;
}

function createWindow() {
  const { windowWidth, windowHeight } = config;

  mainWindow = new BrowserWindow({ width: windowWidth, height: windowHeight });

  mainWindow.loadFile(path.resolve(__dirname, 'index.html'));

  if (config.isDebug) {
    mainWindow.webContents.openDevTools();
  }
  // Emitted when the window is closed.
  mainWindow.on('closed', closeWindow);
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
