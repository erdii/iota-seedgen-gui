import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import { isDevelopment } from "./lib/utils";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 600,
    height: 600,
    resizable: false,
    maximizable: false,
    fullscreenable: false,
    title: "IOTA Seed Generator",
    frame: false,
    show: false,

    // osx only
    titleBarStyle: "hidden",
  });

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();

    // open devtools in development mode
    if (isDevelopment()) {
      mainWindow.webContents.openDevTools();
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file:",
    slashes: true,
  }));

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  app.quit();
});

// app.on("activate", function () {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (mainWindow === null) {
//     createWindow()
//   }
// });