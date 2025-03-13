import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddEntryPage from './pages/AddEntryPage';
import EntryListPage from './pages/EntryListPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';

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
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/" className="navbar-brand">Travel Journal</Link>
          <div className="navbar-nav">
            <Link to="/add" className="nav-link">Add Entry</Link>
            <Link to="/entries" className="nav-link">Entry List</Link>
          </div>
        </div>
      </nav>

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
