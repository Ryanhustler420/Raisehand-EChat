import React, { useEffect, useRef } from 'react';
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
    const watchingPeople = useRef({}); // this will presist the value even if re-render happens, we just use 'watchingPeople.current'
    const activeChat = useSelector(({ chats }) => chats.activeChat[id])
    const joinedUsers = activeChat?.joinedUsers

    useEffect(() => {
        const unsubscribeChat = dispatch(subscribeToChat(id))
        return () => {
            unsubscribeChat()
            unsubscribeWatchedPeoples()
        }
    }, [])

    // if 'joinedUsers' will change this useEffect will be called automatically
    useEffect(() => {
        joinedUsers && subscribedToJoinedUsers(joinedUsers)
    }, [joinedUsers]);

    const subscribedToJoinedUsers = jUsers => {
        jUsers.forEach(user => {
            if (!watchingPeople.current[user.uid]) {
                watchingPeople.current[user.uid] = dispatch(subscribeToProfile(user.uid))
            }
        });
    }

    const unsubscribeWatchedPeoples = () => {
        // has dispatch inside watchingPeople.current[x] so we just need to call
        Object.keys(watchingPeople.current).forEach(id => {
            // watchingPeople.current[id](); <- will work as well
            const unsubscribeMe = watchingPeople.current[id];
            unsubscribeMe();
        })
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

export default withBaseLayout(ChatView, { canGoBack: true })