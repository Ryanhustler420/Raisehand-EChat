import { combineReducers } from "redux"
import { createErrorReducer } from './common-reducers';

const createLoginReducer = () => combineReducers({ error: createErrorReducer('AUTH_LOGIN') })
const createRegisterReducer = () => combineReducers({ error: createErrorReducer('AUTH_REGISTER') })

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