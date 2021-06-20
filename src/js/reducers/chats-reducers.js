const DEFAULT_STATE = {
    items: [],
    isNewChatCreated: false,
}

export default function chatReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case 'CHATS_FETCH_SUCCESS':
            return { ...state, items: action.chats }
        case 'CHATS_CREATE_SUCCESS':
            return { ...state, isNewChatCreated: action.isNew }
        default:
            return state;
    }
}