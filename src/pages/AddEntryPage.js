import React from 'react';
import AddEntry from '../components/AddEntry';

function AddEntryPage({ addEntry, editIndex, entries }) {
  return (
    <div>
      <h1>Add {editIndex !== null ? 'or Edit' : 'New'} Entry</h1>
      <AddEntry onAdd={addEntry} editIndex={editIndex} entries={entries} />
    </div>
  );
}

export default AddEntryPage;
