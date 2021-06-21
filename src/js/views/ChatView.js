import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withBaseLayout } from '../Hoc/BaseLayout';

import ViewTitle from './../components/shared/ViewTitle';
import ChatUsersList from './../components/ChatUsersList';
import ChatMessagesList from './../components/ChatMessagesList';

import { subscribeToChat, subscribeToProfile } from '../actions/chats-actions';

function ChatView() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const activeChat = useSelector(({chats}) => chats.activeChat[id])
    const joinedUsers = activeChat?.joinedUsers

    useEffect(() => {
        const unsubscribeChat = dispatch(subscribeToChat(id))
        return () => {
            unsubscribeChat()
        }
    }, [])

    // if 'joinedUsers' will change this useEffect will be called automatically
    useEffect(() => {
        joinedUsers && subscribedToJoinedUsers(joinedUsers)
    }, [joinedUsers]);


    const subscribedToJoinedUsers = jUsers => {
        jUsers.forEach(user => dispatch(subscribeToProfile(user.uid)));
    }

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