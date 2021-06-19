import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
};

const db = firebase.initializeApp(config).firestore();
export default db;

// firebase.analytics();