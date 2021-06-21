import * as API from '../api/connection_apis'

export const checkUserConnection = () => dispatch =>
    API.onConnectionChanged((isConnected) => {
        console.log(isConnected);
        dispatch({type: 'CONNECTION_USER_STATUS_CHANGED'})
    });