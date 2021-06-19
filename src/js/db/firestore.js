import {secrets} from './secrets';

import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: secrets.FB_APIKEY,
    authDomain: secrets.FB_AUTH_DOMAIN,
    databaseURL: secrets.FB_DATABASE_URL,
    projectId: secrets.FB_PROJECT_ID,
    storageBucket: secrets.FB_STORAGE_BUCKET,
    messagingSenderId: secrets.FB_MESSAGING_SENDER_ID,
    appId: secrets.FB_APP_ID,
    measurementId: secrets.FB_MEASUREMENT_ID
};

const db = firebase.initializeApp(config).firestore();
export default db;

// firebase.analytics();