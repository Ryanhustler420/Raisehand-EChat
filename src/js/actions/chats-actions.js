import * as API from '../api/chats_apis'

export const fetchChats = () => dispatch =>
    API.fetchChats().then(chats => dispatch({
        type: 'CHATS_FETCH_SUCCESS',
        chats
    }))