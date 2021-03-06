import * as API from '../api/auth_apis'

export const registerUser = formData => dispatch => {
    dispatch({ type: 'AUTH_REGISTER_INIT' })
    return API.register(formData)
        .then(user => dispatch({ type: 'AUTH_REGISTER_SUCCESS', user }))
        .catch(reason => dispatch({ type: 'AUTH_REGISTER_ERROR', error: reason }))
}

export const loginUser = formData => dispatch => {
    dispatch({ type: 'AUTH_LOGIN_INIT' })
    return API.login(formData)
        .then(user => dispatch({ type: 'AUTH_LOGIN_SUCCESS', user }))
        .catch(reason => dispatch({ type: 'AUTH_LOGIN_ERROR', error: reason }))
}

export const logout = () => dispatch => {
    dispatch({ type: 'AUTH_LOGOUT_INIT' })
    return API.logout()
        .then(_ => {
            dispatch({type: 'AUTH_LOGOUT_SUCCESS'});
            dispatch({type: 'CHATS_FETCH_RESET_OLD_STATE'});
        }).catch(reason => dispatch({ type: 'AUTH_LOGOUT_ERROR', error: reason }))
}

export const listenToAuthChanges = () => dispatch => {
    dispatch({ type: 'AUTH_ON_INIT', user: null })
    return API.onAuthStateChange(async (authUser) => {
        if (authUser) {
            const userProfile = await API.getUserProfileDocument(authUser.uid)
            dispatch({ type: 'AUTH_ON_SUCCESS', user: userProfile })
        } else {
            dispatch({ type: 'AUTH_ON_ERROR', user: null })
        }
    })
}