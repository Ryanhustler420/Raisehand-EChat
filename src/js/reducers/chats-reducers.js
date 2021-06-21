import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

import _ from 'lodash'

// how will we store this deta, every chat when click
// we get all the users,
// we want to ake a seperate object which will keep track of openChat activity
// chatId, allUsers, messages,

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

    const activeChat = createReducer({}, {
        // here state value will be {}
        'CHATS_SET_ACTIVE_CHAT': (state, action) => {
            const { chat } = action;
            state[chat.id] = chat;
        },
    })

    const isNewChatCreated = (state = false, action) => {
        switch (action.type) {
            case 'CHATS_CREATE_SUCCESS':
                return action.isNew
            default:
                return state;
        }
    }

    return combineReducers({
        activeChat,
        joined: joined,
        available: available,
        isNewChatCreated: isNewChatCreated
    })
}

export default createChatReducer()