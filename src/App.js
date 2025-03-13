import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEntryPage from './pages/AddEntryPage';
import EntryListPage from './pages/EntryListPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navbar';
import { getEntries, addEntry, updateEntry, deleteEntry } from './entriesService';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './firebaseConfig'; 

function App() {
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'entries'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });

    return () => unsubscribe();
  }, []);

  async function fetchEntries() {
    const data = await getEntries();
    setEntries(data);
  }

  const handleAddEntry = async (entry) => {
    if (editIndex !== null) {
      const docId = entries[editIndex].id; // Firestore doc ID
      await updateEntry(docId, entry);
      setEditIndex(null);
    } else {
      await addEntry(entry);
    }
    // fetchEntries();
  };

  const handleDelete = async (index) => {
    const docId = entries[index].id;
    await deleteEntry(docId);
    // fetchEntries(); 
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/add"
              element={
                <AddEntryPage
                  addEntry={handleAddEntry}
                  editIndex={editIndex}
                  entries={entries}
                />
              }
            />
            <Route
              path="/entries"
              element={
                <EntryListPage
                  entries={entries}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
