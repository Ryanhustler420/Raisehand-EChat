import { combineReducers } from 'redux';
import _ from 'lodash'

function createChatReducer() {
    const joined = (state = [], action) => {
        switch (action.type) {
            case 'CHATS_FETCH_RESET_OLD_STATE':
                return [];
            case 'CHATS_FETCH_SUCCESS':
                return action.joined;
            case 'CHATS_JOIN_SUCCESS':
                return _.uniqBy([...state, action.newChat], 'id')
            default:
                return state;
        }
    }

    const available = (state = [], action) => {
        switch (action.type) {
            case 'CHATS_FETCH_RESET_OLD_STATE':
                return [];
            case 'CHATS_FETCH_SUCCESS':
                return action.available;
            case 'CHATS_JOIN_SUCCESS':
                return state.filter(ch => ch.id !== action.newChat.id);
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

    return combineReducers({
        joined: joined,
        available: available,
        isNewChatCreated: isNewChatCreated
    })
}

export default createChatReducer()