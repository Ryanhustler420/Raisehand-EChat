import React from 'react';
import ReactDOM from 'react-dom';

import { ipcRenderer } from 'electron'

export default function App() {

    const title = 'Hello, World'
    const enhancedTitle = title + ' - Reach App!'

    const sendNotification = () => {
        ipcRenderer.send('notify', 'This is my custome message')
    }

    return (
        <>
            <h1>{enhancedTitle}</h1>
            <button onClick={sendNotification}>Send Notification</button>
        </>
    )

}

ReactDOM
    .render(<App />, document.getElementById('Echat'))