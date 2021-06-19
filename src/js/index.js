import React from 'react';
import ReactDOM from 'react-dom';

export default function App() {

    const title = 'Hello, World'
    const enhancedTitle = title + ' - Reach App!'

    const sendNotification = () => {
        electron.notificationApi.sendNotification('This is my custom message, Fixed the context bridge')
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