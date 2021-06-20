// We are creating this function to present every action stage,
// Basically every action has three stage according to this application
// _INIT, _SUCCEDD, _ERROR

export const createErrorReducer = actionType =>
    (state = null, action) => {
        switch (action.type) {
            case `${actionType}_INIT`:
                return null;
            case `${actionType}_ERROR`:
                return action.error
            default:
                return state;
        }
    }

export const createIsFetchingReducer = actionType =>
    (state = false, action) => {
        switch (action.type) {
            case `${actionType}_INIT`:
                return true;
            case `${actionType}_ERROR`:
            case `${actionType}_SUCCESS`:
                return false;
            default:
                return state;
        }
    }