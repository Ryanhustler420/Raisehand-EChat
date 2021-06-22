import db from '../db/firestore'
import { U_PROFILES } from './auth_apis';
import firebase from 'firebase/app';

// Collection Names
const COLLECTION_CHATS = 'chats'
const COLLECTION_MESSAGES = 'messages'

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
    return chatId;
}

export const subscribeToChat = (chatId, onSubscribe) => db
    .collection(COLLECTION_CHATS)
    .doc(chatId)
    .onSnapshot(snap => {
        const chat = { id: snap.id, ...snap.data() }
        onSubscribe(chat)
    })

export const subscribeToProfile = (uid, onSubscribe) => db
    .collection(U_PROFILES)
    .doc(uid)
    .onSnapshot(snap => onSubscribe(snap.data()))

export const subscribeToMessages = (chatId, onSubscribe) => {
    db
        .collection(COLLECTION_CHATS)
        .doc(chatId)
        .collection(COLLECTION_MESSAGES)
        .onSnapshot(snap => onSubscribe(snap.docChanges()))
}

export const sendChatMessage = (message, chatId) => {
    return db
        .collection(COLLECTION_CHATS)
        .doc(chatId)
        .collection(COLLECTION_MESSAGES)
        .doc(message.timestamp)
        .set(message)
}