import { 
    collection, 
    addDoc, 
    getDocs, 
    doc, 
    updateDoc, 
    deleteDoc 
  } from "firebase/firestore";
  import { db } from "./firebaseConfig";
  
  const entriesCollection = collection(db, "entries");
  
  export async function getEntries() {
    const snapshot = await getDocs(entriesCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  
  export async function addEntry(entry) {
    await addDoc(entriesCollection, entry);
  }
  
  export async function updateEntry(id, updatedData) {
    const docRef = doc(db, "entries", id);
    await updateDoc(docRef, updatedData);
  }
  
  export async function deleteEntry(id) {
    const docRef = doc(db, "entries", id);
    await deleteDoc(docRef);
  }
  