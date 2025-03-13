import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where
} from 'firebase/firestore';
import { db } from './firebaseConfig';

const entriesCollection = collection(db, 'entries');

export async function getEntriesForUser(uid) {
    try{
    const q = query(entriesCollection, where("uid", "==", uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error('Error getting entries:', error);
        throw error; 
    }
  }

export async function addEntry(entry) {
    try {
        await addDoc(entriesCollection, entry);
    } catch (error) {
        console.error('Error adding entry:', error);
        throw error;
    }
}

export async function updateEntry(id, updatedData) {
    try {
        const docRef = doc(db, 'entries', id);
        await updateDoc(docRef, updatedData);
    } catch (error) {
        console.error('Error updating entry:', error);
        throw error;
    }
}

export async function deleteEntry(id) {
    try {
        const docRef = doc(db, 'entries', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting entry:', error);
        throw error;
    }
}
