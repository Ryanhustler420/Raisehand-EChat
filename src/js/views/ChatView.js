import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withBaseLayout } from '../Hoc/BaseLayout';

import ViewTitle from './../components/shared/ViewTitle';
import ChatUsersList from './../components/ChatUsersList';
import ChatMessagesList from './../components/ChatMessagesList';

import { subscribeToChat } from '../actions/chats-actions';

function ChatView() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const activeChat = useSelector(({chats}) => chats.activeChat[id])

    useEffect(() => {
        const unsubscribeChat = dispatch(subscribeToChat(id))
        return () => {
            unsubscribeChat()
        }
    }, [])

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUsersList users={activeChat?.joinedUsers || []} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel: ${activeChat?.name}`} />
                <ChatMessagesList />
            </div>
        </div>
    )
}

export default withBaseLayout(ChatView, {canGoBack: true})