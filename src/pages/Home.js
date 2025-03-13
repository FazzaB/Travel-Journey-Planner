import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to Your Travel Journal</h1>
      <p>What would you like to do today?</p>
      <div className="d-flex justify-content-center gap-3">
        <Link to="/add" className="btn btn-primary">Add New Entry</Link>
        <Link to="/entries" className="btn btn-secondary">View Entries</Link>
      </div>
    </div>
  );
}

export default Home;
