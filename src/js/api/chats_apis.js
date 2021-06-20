import db from '../db/firestore'
import { U_PROFILES } from './auth_apis';
import firebase from 'firebase/app';

// Collection Names
const COLLECTION_CHATS = 'chats'

// Helper Method to extract data
const extractSnapshotData = snapshot => snapshot.docs.map(d => ({ id: d.id, ...d.data() }))

export const fetchChats = () => db.collection(COLLECTION_CHATS).get().then(extractSnapshotData)

export const createChat = (chat) =>
    db.collection(COLLECTION_CHATS).add(chat).then(docRef => docRef.id)

export const joinChat = async (userId, chatId) => {
    const userRef = db.doc(`${U_PROFILES}/${userId}`);
    const chatRef = db.doc(`${COLLECTION_CHATS}/${chatId}`);

    await userRef.update({ joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef) })
    await chatRef.update({ joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef) })
}