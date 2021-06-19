import * as API from '../api/auth_apis'

export const registerUser = formData => dispatch =>
    API.register(formData)
        .then(_ => dispatch({ type: 'AUTH_REGISTER_SUCCESS' }))

export const logout = () => dispatch => 
    API.logout()
        .then(_ => dispatch({type: 'AUTH_LOGOUT_SUCCESS'}))

export const loginUser = formData => dispatch => 
    API.login(formData)
        .then(_ => dispatch({type: 'AUTH_LOGIN_SUCCESS'}))

export const listenToAuthChanges = () => dispatch => {
    dispatch({ type: 'AUTH_ON_INIT', user: null })
    API.onAuthStateChange((authUser) => {
        if (authUser) {
            dispatch({ type: 'AUTH_ON_SUCCESS', user: authUser })
        } else {
            dispatch({ type: 'AUTH_ON_ERROR', user: null })
        }
    })
}