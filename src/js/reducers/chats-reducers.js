const DEFAULT_STATE = {
    joined: [],
    available: [],
    isNewChatCreated: false,
}

export default function chatReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case 'CHATS_FETCH_SUCCESS':
            return { ...state, joined: action.chats.joined, available: action.chats.available  }
        case 'CHATS_CREATE_SUCCESS':
            return { ...state, isNewChatCreated: action.isNew }
        case 'CHATS_JOIN_SUCCESS':
        default:
            return state;
    }
}