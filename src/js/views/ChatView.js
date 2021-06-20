import React from 'react';
import { useParams } from 'react-router-dom';

import ViewTitle from './../components/shared/ViewTitle';
import ChatUsersList from './../components/ChatUsersList';
import ChatMessagesList from './../components/ChatMessagesList';
import BaseLayout from './../Layouts/BaseLayout';

export default function ChatView() {
    const { id } = useParams()

    return (
        <BaseLayout canGoBack>
            <div className="row no-gutters fh">
                <div className="col-3 fh">
                    <ChatUsersList />
                </div>
                <div className="col-9 fh">
                    <ViewTitle text={`Joined Channel: ${id}`} />
                    <ChatMessagesList />
                </div>
            </div>
        </BaseLayout>
    )
}
