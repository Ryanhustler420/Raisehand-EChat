/**
 * NOTE: middleware gets called everytime you dispatch any action
 * NOTE: Do not mess with data which are going to receive by any reducer, BAD PRACTICE
 */

/** (param) store:: get state of the application */
/** (param) next:: helps to proceed further in the funnel to next middleware when get call */
/** (param) action:: which we are dispatching  */
export default (store) => (next) => (action) => {

    const DataBucket = store.getState();

    switch (action.type) {
        case 'APP_IS_ONLINE':
        case 'APP_IS_OFFLINE':
            alert('Displaying Notification!')
    }
    next(action) // goes to next middleware, if has any!
}