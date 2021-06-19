import * as API from '../api/auth_apis'

export const registerUser = formData => dispatch =>
    API.register(formData)
        .then(_ => dispatch({ type: 'AUTH_REGISTER_SUCCESS' }))

export const listenToAuthChanges = () => dispatch => {
    dispatch({ type: 'AUTH_ON_INIT' })
    API.onAuthStateChange((authUser) => {
        if (authUser) {
            dispatch({ type: 'AUTH_ON_SUCCESS' })
            console.log('We are authenticated');
        } else {
            dispatch({ type: 'AUTH_ON_ERROR' })
            console.log('We are not-authenticated');
        }
    })
}