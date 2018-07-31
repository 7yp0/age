import { app, BrowserWindow } from 'electron';
import * as path from 'path';

// TODO: dev only
// tslint:disable-next-line:no-require-imports no-expression-statement no-var-requires
require('electron-reload')(path.join(__dirname, './main.ts'), {
  electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
});

/* tslint:disable:no-let no-expression-statement no-if-statement */

let mainWindow: Electron.BrowserWindow | null;

function closeWindow() {
  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainWindow = null;
}

function createWindow() {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadFile(path.join(__dirname, '..', 'index.html'));

  // TODO: dev only
  mainWindow.webContents.openDevTools();

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
