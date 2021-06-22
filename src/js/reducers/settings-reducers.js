const INITIAL_STATE = {
    isDarkTheme: false,
    showNotifications: true,
    playSound: true,
}

export default function settingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SETTINGS_UPDATE':
            return { ...state, [action.setting]: action.value }
        default:
            return state;
    }
}