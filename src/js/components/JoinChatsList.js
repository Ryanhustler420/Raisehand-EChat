import React from 'react';
import ChatSearch from './ChatSearch';
import { useHistory } from 'react-router-dom';

export default function JoinChatsList({ chats }) {

    const history = useHistory()
    const placeholderImage = 'https://via.placeholder.com/350x150'

    return (
        <div className="list-container">
            <ChatSearch />
            <ul className="items">
                {
                    chats.map(chat =>
                        <li
                            key={chat.id}
                            onClick={() => history.push(`/chat/${chat.id}`)}
                            className="item">
                            <div className="item-status">
                                <img src={chat.image.includes('http') ? chat.image : placeholderImage} alt="Retail Admin" />
                                <span className="status online"></span>
                            </div>
                            <p className="name-time">
                                <span className="name mr-2">{chat.name}</span>
                            </p>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}
