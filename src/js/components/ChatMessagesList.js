import React from 'react';

export default function ChatMessagesList({ messages = [] }) {
    return (
        <div className="chat-container">
            <ul className="chat-box chatContainerScroll">
                {
                    messages.map(message => (
                        <li
                            key={message.id}
                            className="chat-left">
                            <div className="chat-avatar">
                                <img
                                    src={message?.author.avatar}
                                    alt="Retail Admin" />
                                <div className="chat-name">{message?.author.username}</div>
                            </div>
                            <div className="chat-text-wrapper">
                                <span className="chat-text">{message.content}</span>
                                <span className="chat-spacer"></span>
                                <div className="chat-hour">{message.timestamp}</div>
                            </div>
                        </li>
                    ))
                }
                {/* <li
                    className="chat-right">
                    <div className="chat-avatar">
                        <img
                            src="https://i.dlpng.com/static/png/7105396_preview.png"
                            alt="Retail Admin" />
                        <div className="chat-name">Test User 2</div>
                    </div>
                    <div className="chat-text-wrapper">
                        <span className="chat-text">Some message 2</span>
                        <span className="chat-spacer"></span>
                        <div className="chat-hour">5h ago</div>
                    </div>
                </li> */}
            </ul>
        </div>
    );
}
