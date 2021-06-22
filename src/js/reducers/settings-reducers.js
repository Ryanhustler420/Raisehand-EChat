import Storage from './../utils/storage';

const INITIAL_STATE = {
    isDarkTheme: false,
    showNotifications: true,
    playSound: true,
    saveable: true,
}

export default function settingReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SETTINGS_UPDATE':
            return { ...state, [action.setting]: action.value }
        case 'SETTINGS_INITIAL_LOAD': {
            const storedSettings = new Storage().getItem('app-settings');
            return { ...state, ...storedSettings }
        }
        default:
            return state;
    }
}