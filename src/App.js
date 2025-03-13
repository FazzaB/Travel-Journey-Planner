import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddEntryPage from './pages/AddEntryPage';
import EntryListPage from './pages/EntryListPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/LogIn';
import SignUp from './pages/SignUp';
import Navigation from './components/Navbar';

function App() {
  const [entries, setEntries] = useLocalStorage('entries', []);
  const [editIndex, setEditIndex] = useState(null);

  const addEntry = (entry) => {
    if (editIndex !== null) {
      const newEntries = [...entries];
      newEntries[editIndex] = entry;
      setEntries(newEntries);
      setEditIndex(null);
    } else {
      setEntries([...entries, entry]);
    }
  };

  const handleDelete = (index) => {
    const newEntries = [...entries];
    newEntries.splice(index, 1);
    setEntries(newEntries);
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
              element={<AddEntryPage addEntry={addEntry} editIndex={editIndex} entries={entries} />} 
            />
            <Route 
              path="/entries" 
              element={<EntryListPage entries={entries} onDelete={handleDelete} onEdit={handleEdit} />} 
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
