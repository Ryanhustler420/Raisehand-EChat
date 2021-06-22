export const updateSettings = (setting, value) => {    
    return {
        type: 'SETTINGS_UPDATE',
        setting,
        value
    }
}

export const loadInitialSettings = (setting, value) => {
    return {type: 'SETTINGS_INITIAL_LOAD'}
}