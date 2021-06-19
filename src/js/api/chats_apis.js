import db from '../db/firestore'

// Collection Names
const COLLECTION_CHATS = 'chats'

export const fetchChats = () => db.collection(COLLECTION_CHATS).get()
    .then(snapshot => snapshot.docs.map(doc => doc.data))
