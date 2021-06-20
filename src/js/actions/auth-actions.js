import * as API from '../api/auth_apis'

export const registerUser = formData => dispatch => {
    dispatch({ type: 'AUTH_REGISTER_INIT' })
    return API.register(formData)
        .catch(reason => dispatch({ type: 'AUTH_REGISTER_ERROR', error: reason }))
}

export const logout = () => dispatch => {
    dispatch({ type: 'AUTH_LOGOUT_INIT' })
    return API.logout()
        .catch(reason => dispatch({ type: 'AUTH_LOGOUT_ERROR', error: reason }))
}

export const loginUser = formData => dispatch => {
    dispatch({ type: 'AUTH_LOGIN_INIT' })
    return API.login(formData)
        .catch(reason => dispatch({ type: 'AUTH_LOGIN_ERROR', error: reason }))
}

export const listenToAuthChanges = () => dispatch => {
    dispatch({ type: 'AUTH_ON_INIT', user: null })
    API.onAuthStateChange(async (authUser) => {
        if (authUser) {
            const userProfile = await API.getUserProfileDocument(authUser.uid)
            dispatch({ type: 'AUTH_ON_SUCCESS', user: userProfile })
        } else {
            dispatch({ type: 'AUTH_ON_ERROR', user: null })
        }
    })
}