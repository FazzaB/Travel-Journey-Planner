// CalendarView.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarView({ entries }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEntries, setSelectedEntries] = useState([]);

  const entryDates = entries.map((entry) => entry.date); 

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const dayString = date.toISOString().split('T')[0]; 
    const filtered = entries.filter((entry) => entry.date === dayString);
    setSelectedEntries(filtered);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dayString = date.toISOString().split('T')[0];
      if (entryDates.includes(dayString)) {
        return 'has-entry'; 
      }
    }
    return null;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayString = date.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dayString);
      if (entry) {
        return (
          <div data-tip={entry.description}>
            <span className="entry-icon">📓</span>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className='d-flex'>
      <h2>Calendar View</h2>
      <Calendar
        onChange={handleDateClick}
        value={date}
        tileClassName={tileClassName}
        tileContent={tileContent}
      />

      <div className="ms-4" style={{ minWidth: '300px' }}>
        <h3>Selected Date Entries</h3>
        {selectedEntries.length === 0 ? (
          <p>No entries for this date.</p>
        ) : (
          selectedEntries.map((entry, index) => (
            <div key={index} className="mb-3 p-2 border rounded">
              <h5>{entry.title}</h5>
              <p>{entry.description}</p>
              <p><strong>Date:</strong> {entry.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarView;
