import React from 'react';
import './EntryCard.css';

const feelingEmojis = {
  Happy: '😊',
  Strong: '💪',
  Calm: '😌',
  Scared: '😰',
  Mad: '😠',
  Sad: '😢'
};

const EntryCard = ({ entry, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
  };

  return (
    <div className="entry-card">
      <div className="entry-header">
        <div className="entry-date">{formatDate(entry.date)}</div>
        <div className="entry-actions">
          <button className="btn-edit" onClick={() => onEdit(entry)} title="Edit entry">
            ✏️
          </button>
          <button className="btn-delete" onClick={() => onDelete(entry.id)} title="Delete entry">
            🗑️
          </button>
        </div>
      </div>

      <div className="entry-feeling">
        <span className="entry-feeling-emoji">{feelingEmojis[entry.feeling]}</span>
        <span className="entry-feeling-name">{entry.feeling}</span>
      </div>

      {entry.why && (
        <div className="entry-section">
          <h4>Why?</h4>
          <p>{entry.why}</p>
        </div>
      )}

      {entry.high && (
        <div className="entry-section">
          <h4>✨ High of the day</h4>
          <p>{entry.high}</p>
        </div>
      )}

      {entry.low && (
        <div className="entry-section">
          <h4>💭 Low of the day</h4>
          <p>{entry.low}</p>
        </div>
      )}

      {entry.grateful && (
        <div className="entry-section">
          <h4>🙏 Grateful for</h4>
          <p>{entry.grateful}</p>
        </div>
      )}
    </div>
  );
};

export default EntryCard;
