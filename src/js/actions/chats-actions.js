import * as API from '../api/chats_apis'
import db from './../db/firestore';
import { U_PROFILES } from './../api/auth_apis';

export const fetchChats = () => dispatch =>
    API.fetchChats().then(chats => dispatch({
        type: 'CHATS_FETCH_SUCCESS',
        chats
    }))

export const createChat = (formData, userId) => dispatch => {
    const newChat = { ...formData }
    const userRef = db.doc(`${U_PROFILES}/${userId}`)
    newChat.admin = userRef
    newChat.joinedUsers = [userRef]

    return API
        .createChat(newChat)
        .then(_ => dispatch({ type: 'CHATS_CREATE_SUCCESS', isNew: true }))
}