import * as API from '../api/chats_apis'
import db from './../db/firestore';
import { U_PROFILES } from './../api/auth_apis';

// getState always comes into actions, thanks to 'thunk'
export const fetchChats = () => async (dispatch, getState) => {
    const { user } = getState().auth;

    dispatch({type: 'CHATS_FETCH_INIT'});
    const chats = await API.fetchChats();
    chats.forEach(chat => chat.joinedUsers = chat.joinedUsers.map(user => user.id))

    // Check if currently login user is part of that group
    const sortedChats = chats.reduce((accuChats, chat) => {
        const chatToJoin = chat.joinedUsers.includes(user.uid) ? 'joined' : 'available';
        accuChats[chatToJoin].push(chat);
        return accuChats;
    }, { joined: [], available: []});

    dispatch({type: 'CHATS_FETCH_SUCCESS', chats: sortedChats})
    return sortedChats;
}

export const createChat = (formData, userId) => async dispatch => {
    const newChat = { ...formData }
    newChat.admin = db.doc(`${U_PROFILES}/${userId}`)

    const chatId = await API.createChat(newChat);
    dispatch({ type: 'CHATS_CREATE_SUCCESS', isNew: true });
    await API.joinChat(userId, chatId);
    dispatch({ type: 'CHATS_JOIN_SUCCESS', isNew: true });
    return chatId;
}