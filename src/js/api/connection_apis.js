import firebase from 'firebase/app';
import 'firebase/database';

import db from './../db/firestore';
import { U_PROFILES } from './auth_apis';

const getOnlineStatus = (isOnline) => ({
    state: isOnline ? 'online' : 'offline',
    lastChanged: firebase.firestore.FieldValue.serverTimestamp()
})

export const setUserOnlineState = (uid, isOnline) => {
    const userRef = db.doc(`${U_PROFILES}/${uid}`);
    return userRef.update(getOnlineStatus(isOnline));
}

export const onConnectionChanged = onConnection =>
    firebase
        .database().ref('.info/connected')
        .on('value', snapshot => onConnection(snapshot.val()))
