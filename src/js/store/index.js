import { createStore, applyMiddleware, combineReducers } from 'redux'
import chatReducer from '../reducers/chats-reducers'
import thunkMiddleware from 'redux-thunk'

// We store all the data to this store,
// All the reducer, actions, component, api
// Every cornor of this application will take advantage
// Of this store, this is a central place for data parking
export default function configureStore() {

    const middlewares = [
        thunkMiddleware,
    ]

    const store = createStore(
        combineReducers({ chats: chatReducer }),
        applyMiddleware(...middlewares)
    )

    return store;
}