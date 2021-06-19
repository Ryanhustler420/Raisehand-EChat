import React, { useEffect } from 'react';
import ViewTitle from '../components/shared/ViewTitle';
import JoinChatsList from '../components/JoinChatsList';
import AvailableChatsList from '../components/AvailableChatsList';

import { fetchChats } from './../api/chats_apis';

export default function HomeView() {

    // will call only once
    useEffect(() => {
        fetchChats().then(console.log);
    }, [])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinChatsList />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose any channel" />
                <AvailableChatsList />
            </div>
        </div>
    )
}