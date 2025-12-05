import React from 'react';
import './FeelingSelector.css';

const feelings = [
  { name: 'Happy', emoji: '😊', color: '#FFD93D' },
  { name: 'Strong', emoji: '💪', color: '#FF6B6B' },
  { name: 'Calm', emoji: '😌', color: '#95E1D3' },
  { name: 'Scared', emoji: '😰', color: '#A78BFA' },
  { name: 'Mad', emoji: '😠', color: '#F97316' },
  { name: 'Sad', emoji: '😢', color: '#60A5FA' }
];

const FeelingSelector = ({ selected, onSelect }) => {
  return (
    <div className="feeling-selector">
      <label className="feeling-label">How are you feeling today?</label>
      <div className="feeling-grid">
        {feelings.map((feeling) => (
          <button
            key={feeling.name}
            type="button"
            className={`feeling-button ${selected === feeling.name ? 'selected' : ''}`}
            onClick={() => onSelect(feeling.name)}
            style={{
              '--feeling-color': feeling.color
            }}
          >
            <span className="feeling-emoji">{feeling.emoji}</span>
            <span className="feeling-name">{feeling.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeelingSelector;
