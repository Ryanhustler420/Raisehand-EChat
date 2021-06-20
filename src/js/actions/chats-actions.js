import * as API from '../api/chats_apis'
import db from './../db/firestore';
import { U_PROFILES } from './../api/auth_apis';

export const fetchChats = () => dispatch =>
    API.fetchChats().then(chats => dispatch({
        type: 'CHATS_FETCH_SUCCESS',
        chats
    }))

export const createChat = (formData, userId) => async dispatch => {
    const newChat = { ...formData }
    newChat.admin = db.doc(`${U_PROFILES}/${userId}`)

    const chatId = await API.createChat(newChat);
    dispatch({ type: 'CHATS_CREATE_SUCCESS', isNew: true });
    await API.joinChat(userId, chatId);
    dispatch({ type: 'CHATS_JOIN_SUCCESS', isNew: true });
    return chatId;
}