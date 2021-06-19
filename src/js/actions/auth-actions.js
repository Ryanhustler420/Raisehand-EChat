import * as API from '../api/auth_apis'

export const registerUser = formData => dispatch => 
    API.register(formData)
    .then(user => {
        dispatch({type: 'AUTH_REGISTER_SUCCESS', user})
        return user
    })