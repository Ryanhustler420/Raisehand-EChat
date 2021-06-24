const path = require('path');
const { app, BrowserWindow, Menu, Notification, ipcMain } = require('electron')

const isDevelopment = !app.isPackaged
let mainWindow;

// function createSecondWindow() {
//     let sec = new BrowserWindow({
//         width: 1200,
//         height: 800,
//         backgroundColor: '#6e707e',
//         webPreferences: {
//             nodeIntegration: false, // prevent html to access the ipcRenderer, so that they can't missuse these function
//             contextIsolation: true, // cant override preload file values via console of browser
//             enableRemoteModule: true, // Allow renderer to access Electron Native API which only get access in main thread
//             worldSafeExecuteJavaScript: true, // Sanitize JS code
//         }
//     })

//     sec.loadURL(`file://${__dirname}/second.html`)
//     sec.on('closed', () => { sec = null });
// }

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: '#6e707e',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false, // prevent html to access the ipcRenderer, so that they can't missuse these function
            contextIsolation: true, // cant override preload file values via console of browser
            enableRemoteModule: true, // Allow renderer to access Electron Native API which only get access in main thread
            worldSafeExecuteJavaScript: true, // Sanitize JS code
        }
    })

    if (isDevelopment) mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on('closed', () => { mainWindow = null });
}

ipcMain.on('notify', (_, message) => {
    if (process.platform === 'win32') app.setAppUserModelId("Raisehand Software LLC");
    const notification = new Notification({ title: 'Runner', body: message, icon: `${__dirname}/icons/logo.png` })
    notification.show()
})

ipcMain.on('app-quit', (e) => app.quit())

app.whenReady().then(() => {
    const template = require('./utils/Menu').createTemplate(app);
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)
    createWindow()
    // createSecondWindow()
})

app.on('ready', (e) => { })
app.on('window-all-closed', (e) => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
// only for mac os where application hangs in dock
app.on('activate', (e) => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

if (isDevelopment) require('electron-reload')(__dirname)