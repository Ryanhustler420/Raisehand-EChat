import db from '../db/firestore'

// Collection Names
const COLLECTION_CHATS = 'chats'

// Helper Method to extract data
const extractSnapshotData = snapshot => snapshot.docs.map(d => ({id: d.id, ...d.data()}))

export const fetchChats = () => db.collection(COLLECTION_CHATS).get().then(extractSnapshotData)
