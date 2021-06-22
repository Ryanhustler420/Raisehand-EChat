const INITIAL_STATE = {
    isDarkTheme: false,
    showNotifications: true,
    playSound: true,
}

export default function settingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SETTINGS_UPDATE':
            return { ...state, [action.setting]: action.value }
        case 'SETTINGS_INITIAL_LOAD': {
            const storedSettings = localStorage.getItem('app-settings');
            const settings = storedSettings ? JSON.parse(storedSettings) : {}
            return { ...state, ...settings }
        }
        default:
            return state;
    }
}