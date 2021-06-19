const { app, BrowserWindow, Menu } = require('electron')

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        backgroundColor: 'white',
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    const menuTemplate = Menu.buildFromTemplate([{label: 'File', submenu: [ { label: 'Exit', click: () => { app.exit() } } ]}])
    Menu.setApplicationMenu(menuTemplate);
}

app.whenReady().then(createWindow)
app.on('ready', (e) => {})