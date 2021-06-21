import * as API from '../api/connection_apis'

export const checkUserConnection = uid => dispatch =>
    API.onConnectionChanged((isConnected) => {
        API.setUserOnlineState(uid, isConnected)
        dispatch({type: 'CONNECTION_USER_STATUS_CHANGED'})
    });