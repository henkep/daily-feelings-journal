const STORAGE_KEY = 'dailyFeelingsJournal';

export const loadEntries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading entries:', error);
    return [];
  }
};

export const saveEntries = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return true;
  } catch (error) {
    console.error('Error saving entries:', error);
    return false;
  }
};

export const addEntry = (entry) => {
  const entries = loadEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
    date: entry.date || new Date().toISOString().split('T')[0]
  };
  entries.push(newEntry);
  saveEntries(entries);
  return newEntry;
};

export const updateEntry = (id, updatedEntry) => {
  const entries = loadEntries();
  const index = entries.findIndex(entry => entry.id === id);
  if (index !== -1) {
    entries[index] = { ...entries[index], ...updatedEntry };
    saveEntries(entries);
    return entries[index];
  }
  return null;
};

export const deleteEntry = (id) => {
  const entries = loadEntries();
  const filteredEntries = entries.filter(entry => entry.id !== id);
  saveEntries(filteredEntries);
  return filteredEntries;
};
