import * as API from '../api/auth_apis'

export const registerUser = ({email, password}) => dispatch => 
    API.register(email, password)
    .then(user => {
        dispatch({type: 'AUTH_REGISTER_SUCCESS', user})
        return user
    })