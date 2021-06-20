import { combineReducers } from "redux"

function createLoginReducer() {
    const error = (state = null, action) => {
        switch (action.type) {
            case 'AUTH_LOGIN_INIT':
                return null;
            case 'AUTH_LOGIN_ERROR':
                return action.error
            default:
                return state;
        }
    }

    return combineReducers({error})
}

function createRegisterReducer() {
    const error = (state = null, action) => {
        switch (action.type) {
            case 'AUTH_REGISTER_INIT':
                return null
            case 'AUTH_REGISTER_ERROR':
                return action.error
            default:
                return state;
        }
    }

    return combineReducers({error})
}

function authReducer() {
    const user = (state = null, action) => {
        switch (action.type) {
            case 'AUTH_ON_ERROR':
            case 'AUTH_ON_INIT':
                return null
            case 'AUTH_ON_SUCCESS':
                return action.user
            default:
                return state
        }
    }
    const isChecking = (state = false, action) => {

        switch (action.type) {
            case 'AUTH_REGISTER_INIT':
            case 'AUTH_LOGOUT_INIT':
            case 'AUTH_LOGIN_INIT':
            case 'AUTH_ON_INIT':
                return true
            case 'AUTH_REGISTER_ERROR':
            case 'AUTH_LOGIN_ERROR':
            case 'AUTH_ON_SUCCESS':
            case 'AUTH_ON_ERROR':
                return false
            default:
                return state;
        }

    }
    return combineReducers({
        user,
        isChecking,
        login: createLoginReducer(),
        register: createRegisterReducer(),
    })
}

export default authReducer()