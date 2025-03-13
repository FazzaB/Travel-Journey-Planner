import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddEntryPage from './pages/AddEntryPage';
import EntryListPage from './pages/EntryListPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navbar';
import { getEntriesForUser, addEntry, updateEntry, deleteEntry } from './entriesService';

function App() {
  const [entries, setEntries] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const { user } = useAuth();


  useEffect(() => {
    if (user) {
      fetchUserEntries(user.uid);
    } else {
      setEntries([]); // Clear entries when logged out
    }
  }, [user]);

  async function fetchUserEntries(uid) {
    try {
      const data = await getEntriesForUser(uid);
      setEntries(data);
    } catch (error) {
      console.error("Error fetching user entries:", error);
    }
  }

  // async function fetchEntries() {
  //   const data = await getEntries();
  //   setEntries(data);
  // }

  const handleAddEntry = async (entry) => {
    try {
      if (editIndex !== null) {
        const docId = entries[editIndex].id; // Firestore document ID
        await updateEntry(docId, entry);
        setEditIndex(null);
      } else {
        await addEntry({...entry, uid:user.uid});
      }
    } catch (error) {
      console.error('Error adding/updating entry:', error);
      setErrorMsg('Something went wrong while adding the entry.');
    }
  };

  const handleDelete = async (index) => {
    try {
      const docId = entries[index].id;
      await deleteEntry(docId);
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };
  const handleEdit = (index) => {
    setEditIndex(index);
  };

  return (
      <Router>
        <Navigation />
        <div>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
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
        </div>
      </Router>
  );
}

export default App;
