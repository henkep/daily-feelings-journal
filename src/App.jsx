import React, { useState, useEffect } from 'react';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';
import { loadEntries, addEntry, updateEntry, deleteEntry } from './utils/storage';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    const loadedEntries = loadEntries();
    // Sort by date (newest first)
    const sortedEntries = loadedEntries.sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    setEntries(sortedEntries);
  }, []);

  const handleSaveEntry = (formData) => {
    if (editingEntry) {
      // Update existing entry
      const updated = updateEntry(editingEntry.id, formData);
      if (updated) {
        const updatedEntries = entries.map(entry => 
          entry.id === editingEntry.id ? updated : entry
        );
        setEntries(updatedEntries.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        ));
        setEditingEntry(null);
      }
    } else {
      // Add new entry
      const newEntry = addEntry(formData);
      const updatedEntries = [...entries, newEntry];
      setEntries(updatedEntries.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      ));
    }
  };

  const handleEditEntry = (entry) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      deleteEntry(id);
      setEntries(entries.filter(entry => entry.id !== id));
      if (editingEntry && editingEntry.id === id) {
        setEditingEntry(null);
      }
    }
  };

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1>✨ Daily Feelings Journal ✨</h1>
          <p className="app-subtitle">Track your emotions and celebrate your day</p>
        </header>

        <main>
          <EntryForm 
            onSave={handleSaveEntry}
            editEntry={editingEntry}
            onCancelEdit={handleCancelEdit}
          />
          
          <EntryList 
            entries={entries}
            onEdit={handleEditEntry}
            onDelete={handleDeleteEntry}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
