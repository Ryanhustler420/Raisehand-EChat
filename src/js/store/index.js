import { createStore, applyMiddleware, combineReducers } from 'redux'
import chatReducer from '../reducers/chats-reducers'
import rootReducer from '../reducers/root-reducers'
import authReducer from '../reducers/auth-reducers'

import thunkMiddleware from 'redux-thunk'
import rootMiddleware from './middlewares/root-middleware'

// We store all the data to this store,
// All the reducer, actions, component, api
// Every cornor of this application will take advantage
// Of this store, this is a central place for data parking
export default function configureStore() {

    const middlewares = [
        thunkMiddleware,
        rootMiddleware,
    ]

    const mainReducer = combineReducers({
        chats: chatReducer,
        auth: authReducer,
        root: rootReducer
    });

    const filteredReducer = (state, action) => {
        debugger
        if (action.type === 'AUTH_LOGOUT_SUCCESS') {
            state = undefined;
        }
        return mainReducer(state, action)
    }

    const store = createStore(filteredReducer, applyMiddleware(...middlewares))

    return store;
}