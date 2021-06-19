import React, { useEffect } from 'react';
import ViewTitle from '../components/shared/ViewTitle';
import JoinChatsList from '../components/JoinChatsList';
import AvailableChatsList from '../components/AvailableChatsList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchChats } from '../actions/chats-actions';

export default function HomeView() {

    const dispatch = useDispatch()
    const chats = useSelector(({chats}) => chats.items)

    // will call only once
    useEffect(() => {
        dispatch(fetchChats())
    }, [dispatch])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinChatsList chats={chats} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text="Choose any channel" />
                <AvailableChatsList chats={chats} />
            </div>
        </div>
    )
}