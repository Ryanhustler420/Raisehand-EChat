import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'

// We store all the data to this store,
// All the reducer, actions, component, api
// Every cornor of this application will take advantage
// Of this store, this is a central place for data parking
export default function configureStore() {

    const middlewares = [ 
        thunkMiddleware,
    ]

    const store = createStore(() => {
        return {
            message: 'Hello, World',
            data1: 'Just some testing data',
            data2: 'Just some testing data 2',
        }
    }, applyMiddleware(...middlewares))

    return store;
}