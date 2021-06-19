import * as API from '../api/chats_apis'

export function fetchChats() {
    return async function(dispatch) {
        const chats = await API.fetchChats()
        dispatch({
            type: 'CHATS_FETCH_SUCCESS',
            chats
        })

        return chats;
    }
}