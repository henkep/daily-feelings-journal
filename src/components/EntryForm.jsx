import React, { useState, useEffect } from 'react';
import FeelingSelector from './FeelingSelector';
import './EntryForm.css';

const EntryForm = ({ onSave, editEntry, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    feeling: '',
    why: '',
    high: '',
    low: '',
    grateful: ''
  });

  useEffect(() => {
    if (editEntry) {
      setFormData(editEntry);
    }
  }, [editEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeelingSelect = (feeling) => {
    setFormData(prev => ({ ...prev, feeling }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.feeling) {
      alert('Please select a feeling');
      return;
    }
    onSave(formData);
    
    // Reset form if not editing
    if (!editEntry) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        feeling: '',
        why: '',
        high: '',
        low: '',
        grateful: ''
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      feeling: '',
      why: '',
      high: '',
      low: '',
      grateful: ''
    });
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form className="entry-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>{editEntry ? 'Edit Entry' : 'New Entry'}</h2>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <FeelingSelector
        selected={formData.feeling}
        onSelect={handleFeelingSelect}
      />

      <div className="form-group">
        <label htmlFor="why">Why?</label>
        <textarea
          id="why"
          name="why"
          value={formData.why}
          onChange={handleChange}
          placeholder="Tell us why you feel this way..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="high">What is your high for the day?</label>
        <textarea
          id="high"
          name="high"
          value={formData.high}
          onChange={handleChange}
          placeholder="The best thing that happened today..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="low">What is your low for the day?</label>
        <textarea
          id="low"
          name="low"
          value={formData.low}
          onChange={handleChange}
          placeholder="Something that didn't go well..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label htmlFor="grateful">I'm grateful for this today:</label>
        <textarea
          id="grateful"
          name="grateful"
          value={formData.grateful}
          onChange={handleChange}
          placeholder="Something you're thankful for..."
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {editEntry ? 'Update Entry' : 'Save Entry'}
        </button>
        {editEntry && (
          <button type="button" className="btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default EntryForm;
