import React, { useState } from 'react';
import { createTimeStamp } from './../utils/FirebaseTime';

export default function MessageBox({onSubmit}) {

    const [value, setValue] = useState()

    const onKeyPress = e => {
        if (e.key === 'Enter') { 
            sendMessage()
        }
    }

    const onSendButtonClick = () => {
        sendMessage()
    }

    const sendMessage = () => {
        if (value.trim() === '') return;

        const message = {
            content: value.trim(),
            timestemp: createTimeStamp(),
        }

        onSubmit(message);
        setValue('')
    }

    return (
        <div className="chat-input form-group mt-3 mb-0 d-flex">
            <textarea
                style={{ resize: 'none' }}
                onKeyPress={onKeyPress}
                onChange={e => setValue(e.target.value)}
                className="form-control"
                value={value}
                row='3'
                placeholder="Type your message here..."
            />
            <button className="btn btn-primary" onClick={() => onSendButtonClick()}>
                Send
            </button>
        </div>
    );
}
