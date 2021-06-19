const { app, BrowserWindow, Menu } = require('electron')

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    const menuTemplate = Menu.buildFromTemplate([{label: 'File', submenu: [ { label: 'Exit', click: () => { app.exit() } } ]}])
    Menu.setApplicationMenu(menuTemplate);

    mainWindow.on('closed', () => {mainWindow = null});
}

app.whenReady().then(createWindow)
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