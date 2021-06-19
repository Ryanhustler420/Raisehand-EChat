import React from 'react';
import ViewTitle from './../components/shared/ViewTitle';
import ChatUsersList from './../components/ChatUsersList';
import ChatMessagesList from './../components/ChatMessagesList';

export default function ChatView() {
    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUsersList />
            </div>
            <div className="col-9 fh">
                <ViewTitle />
                <ChatMessagesList />
            </div>
        </div>
    )
}
