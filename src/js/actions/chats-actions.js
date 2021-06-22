import * as API from '../api/chats_apis'
import db from './../db/firestore';
import { U_PROFILES } from './../api/auth_apis';

// getState always comes into actions, thanks to 'thunk'
export const fetchChats = () => async (dispatch, getState) => {
    const { user } = getState().auth;

    dispatch({ type: 'CHATS_FETCH_INIT' });
    const chats = await API.fetchChats();
    chats.forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id))

    // Check if currently login user is part of that group
    const sortedChats = chats.reduce((accuChats, chat) => {
        const chatToJoin = chat.joinedUsers.includes(user.uid) ? 'joined' : 'available';
        accuChats[chatToJoin].push(chat);
        return accuChats;
    }, { joined: [], available: [] });

    dispatch({ type: 'CHATS_FETCH_SUCCESS', ...sortedChats })
    return sortedChats;
}

export const joinChat = (chat, uid) => async dispatch => {
    const chatId = await API.joinChat(uid, chat.id)
    dispatch({ type: 'CHATS_JOIN_SUCCESS', newChat: chat });
}

export const createChat = (formData, userId) => async dispatch => {
    const newChat = { ...formData }
    newChat.admin = db.doc(`${U_PROFILES}/${userId}`)

    const chatId = await API.createChat(newChat);
    dispatch({ type: 'CHATS_CREATE_SUCCESS', isNew: true });
    await API.joinChat(userId, chatId);
    dispatch({ type: 'CHATS_JOIN_SUCCESS', newChat: { ...newChat, id: chatId } });
    return chatId;
}

export const subscribeToChat = chatId => dispatch =>
    API.subscribeToChat(chatId, async fetchedChat => {
        let joinedUsers = fetchedChat.joinedUsers.map(async userRef => {
            const userSnapshot = await userRef.get()
            return userSnapshot.data()
        })

        fetchedChat.joinedUsers = await Promise.all(joinedUsers)
        dispatch({ type: 'CHATS_SET_ACTIVE_CHAT', chat: fetchedChat })
    });

export const subscribeToProfile = (uid, chatid) => dispatch =>
    API.subscribeToProfile(uid, watchPeople => {
        dispatch({ type: 'CHATS_UPDATE_USER_STATE', watchPeople, chatid })
    });

export const subscribeToMessages = chatId => dispatch => {
    return API.subscribeToMessages(chatId, async (latestMessages) => {

        const messages = latestMessages.map(message => {
            if (message.type === 'added') {
                return { id: message.doc.id, ...message.doc.data() }
            }
        })

        const messagesWithAuthor = []
        const cache = {}

        for await (let message of messages) {
            if (cache[message.author.id]) {
                message.author = cache[message.author.id]
            } else {
                const userSnapshot = await message.author.get()
                message.author = cache[userSnapshot.id] = userSnapshot.data()
            }
            messagesWithAuthor.push(message)
        }

        return dispatch({ type: 'CHATS_SET_MESSAGES', messages: messagesWithAuthor, chatId })
    })
}

export const registerMessageSubscription = (chatId, subscription) => ({
    type: 'CHATS_REGISTER_MESSAGE_SUB',
    sub: subscription,
    chatId,
})

export const sendChatMessage = (message, chatId) => (dispatch, getState) => {
    const newMessage = { ...message }

    // current logged in user
    const { user } = getState().auth
    const userRef = db.doc(`${U_PROFILES}/${user.uid}`)
    newMessage.author = userRef;

    return API
        .sendChatMessage(newMessage, chatId)
        .then(_ => dispatch({ type: 'CHATS_MESSAGE_SENT' }));
}