import { combineReducers } from 'redux';

function createChatReducer() {
    const joined = (state = [], action) => {
        switch (action.type) {
            case 'CHATS_FETCH_SUCCESS':
                return action.joined;
            default:
                return state;
        }
    }

    const available = (state =[], action) => {
        switch (action.type) {
            case 'CHATS_FETCH_SUCCESS':
                return action.available;
            default:
                return state;
        }
    }

    const isNewChatCreated = (state = false, action) => {
        switch (action.type) {
            case 'CHATS_CREATE_SUCCESS':
                return action.isNew
            default:
                return state;
        }
    }

    return combineReducers ({
        joined: joined,
        available: available,
        isNewChatCreated: isNewChatCreated
    })
}

export default createChatReducer()