import React, { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { withBaseLayout } from '../Hoc/BaseLayout';

import Loading from './../components/shared/Loading';
import ViewTitle from './../components/shared/ViewTitle';
import MessageBox from './../components/MessageBox';
import ChatUsersList from './../components/ChatUsersList';
import ChatMessagesList from './../components/ChatMessagesList';

import { 
    subscribeToChat, 
    sendChatMessage,
    subscribeToProfile, 
    subscribeToMessages,
} from '../actions/chats-actions';

function ChatView() {

    // useCallback(func()) , prevent to recreate functions even if component re-renders

    const { id } = useParams()
    const dispatch = useDispatch()
    const watchingPeople = useRef({}); // this will presist the value even if re-render happens, we just use 'watchingPeople.current'
    const activeChat = useSelector(({ chats }) => chats.activeChat[id])
    const joinedUsers = activeChat?.joinedUsers

    useEffect(() => {
        const unsubscribeChat = dispatch(subscribeToChat(id))
        dispatch(subscribeToMessages(id)); // no need to unsubscribe because we want to listen via notification later on
        return () => {
            unsubscribeChat()
            unsubscribeWatchedPeoples()
        }
    }, [])

    // if 'joinedUsers' will change this useEffect will be called automatically
    useEffect(() => {
        joinedUsers && subscribedToJoinedUsers(joinedUsers)
    }, [joinedUsers]);

    const subscribedToJoinedUsers = useCallback(jUsers => {
        jUsers.forEach(user => {
            if (!watchingPeople.current[user.uid]) {
                watchingPeople.current[user.uid] = dispatch(subscribeToProfile(user.uid, id))
            }
        });
    }, [dispatch, id])

    const sendMessage = useCallback(message => {
        dispatch(sendChatMessage(message, id))
    }, [id])

    const unsubscribeWatchedPeoples = useCallback(() => {
        // has dispatch inside watchingPeople.current[x] so we just need to call
        Object.keys(watchingPeople.current).forEach(id => {
            // watchingPeople.current[id](); <- will work as well
            const unsubscribeMe = watchingPeople.current[id];
            unsubscribeMe();
        })
    }, [watchingPeople.current])

    if (!activeChat?.id) {
        return <Loading message={'Loading chat...'} />
    }

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <ChatUsersList users={activeChat?.joinedUsers || []} />
            </div>
            <div className="col-9 fh">
                <ViewTitle text={`Channel: ${activeChat?.name}`} />
                <ChatMessagesList />
                <MessageBox onSubmit={sendMessage} />
            </div>
        </div>
    )
}

export default withBaseLayout(ChatView, { canGoBack: true })