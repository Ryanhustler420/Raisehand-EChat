import React, { useState } from 'react';

export default function MessageBox({onSubmit}) {

    const [value, setValue] = useState()

    const onKeyPress = e => {
        if (e.key === 'Enter') { 
            console.log(value);
        }
    }

    const onSendButtonClick = () => {
        onSubmit(value);
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
