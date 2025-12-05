import React from 'react';
import EntryCard from './EntryCard';
import './EntryList.css';

const EntryList = ({ entries, onEdit, onDelete }) => {
  if (entries.length === 0) {
    return (
      <div className="entry-list-empty">
        <div className="empty-state">
          <span className="empty-icon">📔</span>
          <h3>No entries yet</h3>
          <p>Start journaling by creating your first entry above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="entry-list">
      <h2 className="entry-list-title">Past Entries</h2>
      <div className="entry-list-grid">
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default EntryList;
