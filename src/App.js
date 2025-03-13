import React, { useState } from 'react';
import AddEntry from './components/AddEntry';
import EntryList from './components/EntryList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useLocalStorage from './hooks/useLocalStorage';


function App() {
	const [entries, setEntries] = useLocalStorage('entries', []);
	const [editIndex, setEditIndex] = useState(null);
	// New state to keep track of the index being edited

	const addEntry = (entry) => {
		if (editIndex !== null) {
			// If editIndex is not null, it means in edit mode
			const newEntries = [...entries];
			newEntries[editIndex] = entry;
			// Replace the entry at editIndex with the updated entry
			setEntries(newEntries);
			setEditIndex(null);
			// Reset editIndex after editing
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
		// Set the index of the entry being edited
	};

	return (
		<div className="container">
			<div className="form-container">
				<h1 className="text-center">
					Travel Journal
				</h1>
				<AddEntry onAdd={addEntry}
					editIndex={editIndex}
					entries={entries} />
			</div>
			<div className="table-container p-4">
				<EntryList entries={entries}
					onDelete={handleDelete}
					onEdit={handleEdit} />
			</div>
		</div>
	);
}

export default App;
