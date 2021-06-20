import firebase from 'firebase'
import 'firebase/auth'

import db from '../db/firestore'

// Collection Names
const U_PROFILES = 'uProfiles'

const createUserProfileDocument = (userProfile) =>
    db.collection(U_PROFILES)
        .doc(userProfile.uid)
        .set(userProfile)

export const getUserProfileDocument = uid =>
    db.collection(U_PROFILES).doc(uid).get()
        .then(snapshot => ({ ...snapshot.data() }))

export async function register({ email, password, username, avatar }) {
    try {
        const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
        await createUserProfileDocument({ uid: user.uid, username, email, avatar, joinedChats: [] })
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const login = ({ email, password }) => firebase.auth().signInWithEmailAndPassword(email, password)

export const logout = () => firebase.auth().signOut()

export const onAuthStateChange = onAuth => firebase.auth().onAuthStateChanged(onAuth)