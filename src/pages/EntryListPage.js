import React from 'react';
import EntryList from '../components/EntryList';

function EntryListPage({ entries, onDelete, onEdit }) {
  return (
    <div>
      <h1>Your Journal Entries</h1>
      <EntryList entries={entries} onDelete={onDelete} onEdit={onEdit} />
    </div>
  );
}

export default EntryListPage;
