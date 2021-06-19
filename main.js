const path = require('path');
const { app, BrowserWindow, Menu, Notification } = require('electron')

const isDevelopment = !app.isPackaged
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: 'white',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true, // allow html to access node API
            contextIsolation: false, // ensure that both your preload script & electron internal logic run in sparate context
            enableRemoteModule: true, // Allow renderer to access Electron Native API which only get access in main thread
            worldSafeExecuteJavaScript: true, // Sanitize JS code
        }
    })

    if (isDevelopment) mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    const menuTemplate = Menu.buildFromTemplate([{label: 'File', submenu: [ { label: 'Exit', click: () => { app.exit() } } ]}])
    Menu.setApplicationMenu(menuTemplate);

    mainWindow.on('closed', () => {mainWindow = null});
}

app.whenReady().then(() => {
    createWindow()
    if (process.platform === 'win32') app.setAppUserModelId("Raisehand Software LLC");
    const notification = new Notification({title: 'Runner', body: 'Application has started', icon: `${__dirname}/icons/logo.png`})
    notification.show()
})
app.on('ready', (e) => {})
app.on('window-all-closed', (e) => {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})
// only for mac os where application hangs in dock
app.on('activate', (e) => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})

if (isDevelopment) require('electron-reload')(__dirname)