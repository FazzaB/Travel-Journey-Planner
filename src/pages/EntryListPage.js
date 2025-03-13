import React from 'react';
import EntryList from '../components/EntryList';
import CalendarView from '../components/CalendarView';
import { useState } from 'react';

function EntryListPage({ entries, onDelete, onEdit }) {
    const [view, setView] = useState('table');
  
    return (
      <div>
        <h1>Your Journal Entries</h1>
        <div className="btn-group mb-3">
          <button 
            className={`btn btn-sm ${view === 'table' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('table')}
          >
            Table View
          </button>
          <button 
            className={`btn btn-sm ${view === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('calendar')}
          >
            Calendar View
          </button>
        </div>
  
        {view === 'table' ? (
          <EntryList entries={entries} onDelete={onDelete} onEdit={onEdit} />
        ) : (
          <CalendarView entries={entries} />
        )}
      </div>
    );
  }
  
  export default EntryListPage;
