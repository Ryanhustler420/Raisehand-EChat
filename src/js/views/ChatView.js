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
    registerMessageSubscription,
} from '../actions/chats-actions';

function ChatView() {

    // useCallback(func()) , prevent to recreate functions even if component re-renders

    const { id } = useParams()
    const dispatch = useDispatch()
    const watchingPeople = useRef({}); // this will presist the value even if re-render happens, we just use 'watchingPeople.current'
    const messageList = useRef({});
    const activeChat = useSelector(({ chats }) => chats.activeChat[id])
    const messages = useSelector(({ chats }) => chats.messages[id])
    const joinedUsers = activeChat?.joinedUsers
    const messagesSubscription = useSelector(({ chats }) => chats.messagesSubscriptions[id])

    useEffect(() => {
        const unsubscribeChat = dispatch(subscribeToChat(id))

        if (!messagesSubscription) {
            const unsubscriptionMessages = dispatch(subscribeToMessages(id));
            dispatch(registerMessageSubscription(id, unsubscriptionMessages));
            // we are saving the subscription listenter to redux state, so that it wont call
            // again when we enter into this chat, after existing...
        }

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
            .then(_ => messageList.current.scrollIntoView(false))
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
                <ChatMessagesList
                    innerRef={messageList}
                    messages={messages}
                />
                <MessageBox onSubmit={sendMessage} />
            </div>
        </div>
    )
}

export default withBaseLayout(ChatView, { canGoBack: true })