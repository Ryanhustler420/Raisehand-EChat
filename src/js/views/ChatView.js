import React from 'react';
import { useParams } from 'react-router-dom';

import ViewTitle from './../components/shared/ViewTitle';
import ChatUsersList from './../components/ChatUsersList';
import ChatMessagesList from './../components/ChatMessagesList';

export default function ChatView() {
    const {id} = useParams()

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUsersList />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Joined Channel: ${id}`} />
                <ChatMessagesList />
            </div>
        </div>
    )
}
