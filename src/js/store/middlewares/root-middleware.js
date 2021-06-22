/**
 * NOTE: middleware gets called everytime you dispatch any action
 * NOTE: Do not mess with data which are going to receive by any reducer, BAD PRACTICE
 */

import _ from 'lodash';
import Storage from './../../utils/storage';
import Notifications from "../../utils/Notifications";

/** (param) store:: get state of the application */
/** (param) next:: helps to proceed further in the funnel to next middleware when get call */
/** (param) action:: which we are dispatching  */
export default (store) => (next) => (action) => {

    const DataBucket = store.getState();

    switch (action.type) {
        case 'APP_IS_ONLINE':
        case 'APP_IS_OFFLINE': {
            Notifications
                .show({
                    title: 'Connection Status',
                    body: action.isOnline ? 'Online' : 'Offline'
                });
        }
        case 'SETTINGS_UPDATE': {
            const { setting, value } = action;
            const currentSettings = new Storage().getItem('app-settings');
            const settings = { ...currentSettings, [setting]: value }
            new Storage().setItem('app-settings', settings)
        }
        case 'AUTH_LOGOUT_SUCCESS': {
            // unsubscribing all the listeners, to prevent memory leaks
            const { messagesSubscriptions } = store.getState().chats;
            if (messagesSubscriptions) {
                // messagesSubscriptions = {'chatId' : [sub1]}
                _.forEach(_.keys(messagesSubscriptions), chatId => {
                    const unsubs = messagesSubscriptions[chatId];
                    unsubs(); // removing listeners
                });
            }
        }
    }
    next(action) // goes to next middleware, if has any!
}