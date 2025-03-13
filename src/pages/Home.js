import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <div className="bg-light p-5 rounded-3 text-center">
        <h1>Welcome to Your Travel Journal</h1>
        <p className="lead mt-3">
          What would you like to do today?
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/add" className="btn btn-primary btn-lg">
            Add New Entry
          </Link>
          <Link to="/entries" className="btn btn-secondary btn-lg">
            View Entries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
