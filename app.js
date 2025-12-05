// Default feelings configuration
const DEFAULT_FEELINGS = [
    { name: 'Happy', emoji: '😊', class: 'happy' },
    { name: 'Strong', emoji: '💪', class: 'strong' },
    { name: 'Calm', emoji: '😌', class: 'calm' },
    { name: 'Scared', emoji: '😰', class: 'scared' },
    { name: 'Mad', emoji: '😠', class: 'mad' },
    { name: 'Sad', emoji: '😢', class: 'sad' }
];

// App state
let customFeelings = [];
let selectedFeelings = new Set();
let journalEntries = [];

// DOM elements
const defaultFeelingsContainer = document.getElementById('default-feelings');
const customFeelingsContainer = document.getElementById('custom-feelings');
const customFeelingInput = document.getElementById('custom-feeling-input');
const addFeelingBtn = document.getElementById('add-feeling-btn');
const selectedFeelingsContainer = document.getElementById('selected-feelings');
const entryFormSection = document.getElementById('entry-form-section');
const entryDateInput = document.getElementById('entry-date');
const entryWhyInput = document.getElementById('entry-why');
const entryHighInput = document.getElementById('entry-high');
const entryLowInput = document.getElementById('entry-low');
const entryGratefulInput = document.getElementById('entry-grateful');
const saveEntryBtn = document.getElementById('save-entry-btn');
const journalEntriesContainer = document.getElementById('journal-entries');

// Initialize app
function init() {
    loadFromLocalStorage();
    renderDefaultFeelings();
    renderCustomFeelings();
    renderSelectedFeelings();
    renderJournalEntries();
    attachEventListeners();
}

// Load data from localStorage
function loadFromLocalStorage() {
    const savedCustomFeelings = localStorage.getItem('customFeelings');
    if (savedCustomFeelings) {
        customFeelings = JSON.parse(savedCustomFeelings);
    }

    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
        journalEntries = JSON.parse(savedEntries);
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('customFeelings', JSON.stringify(customFeelings));
    localStorage.setItem('journalEntries', JSON.stringify(journalEntries));
}

// Render default feelings
function renderDefaultFeelings() {
    defaultFeelingsContainer.innerHTML = '';
    
    DEFAULT_FEELINGS.forEach(feeling => {
        const button = createFeelingButton(feeling.name, feeling.emoji, 'default', feeling.class);
        defaultFeelingsContainer.appendChild(button);
    });
}

// Render custom feelings
function renderCustomFeelings() {
    customFeelingsContainer.innerHTML = '';
    
    if (customFeelings.length === 0) {
        customFeelingsContainer.innerHTML = '<p class="empty-state">No custom feelings yet. Add your own!</p>';
        return;
    }
    
    customFeelings.forEach((feeling, index) => {
        const button = createFeelingButton(feeling.name, feeling.emoji || '✨', 'custom', null, index);
        customFeelingsContainer.appendChild(button);
    });
}

// Create a feeling button
function createFeelingButton(name, emoji, type, cssClass, index) {
    const button = document.createElement('button');
    button.className = `feeling-btn ${type}`;
    if (cssClass) {
        button.classList.add(cssClass);
    }
    button.textContent = `${emoji} ${name}`;
    button.dataset.feeling = name;
    button.dataset.type = type;
    
    // Add selected class if feeling is selected
    if (selectedFeelings.has(name)) {
        button.classList.add('selected');
    }
    
    // Add click handler for feeling selection
    button.addEventListener('click', (e) => {
        // Don't toggle if clicking delete button
        if (e.target.classList.contains('delete-btn')) {
            return;
        }
        toggleFeeling(name, button);
    });
    
    // Add delete button for custom feelings
    if (type === 'custom') {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete this feeling';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteCustomFeeling(index);
        });
        button.appendChild(deleteBtn);
    }
    
    return button;
}

// Toggle feeling selection
function toggleFeeling(name, button) {
    if (selectedFeelings.has(name)) {
        selectedFeelings.delete(name);
        button.classList.remove('selected');
    } else {
        selectedFeelings.add(name);
        button.classList.add('selected');
    }
    
    renderSelectedFeelings();
}

// Render selected feelings
function renderSelectedFeelings() {
    selectedFeelingsContainer.innerHTML = '';
    
    if (selectedFeelings.size === 0) {
        selectedFeelingsContainer.innerHTML = '<p class="empty-state">No feelings selected yet. Click on any feeling above!</p>';
        entryFormSection.style.display = 'none';
        return;
    }
    
    selectedFeelings.forEach(feeling => {
        const tag = document.createElement('span');
        tag.className = 'selected-feeling-tag';
        tag.textContent = feeling;
        selectedFeelingsContainer.appendChild(tag);
    });
    
    // Show entry form and set date to today
    entryFormSection.style.display = 'block';
    const now = new Date();
    const today = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
    entryDateInput.value = today;
    
    // Scroll to entry form
    entryFormSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Add custom feeling
function addCustomFeeling() {
    const feelingName = customFeelingInput.value.trim();
    
    if (!feelingName) {
        alert('Please enter a feeling name');
        return;
    }
    
    // Check if feeling already exists (in default or custom)
    const allFeelingNames = [
        ...DEFAULT_FEELINGS.map(f => f.name.toLowerCase()),
        ...customFeelings.map(f => f.name.toLowerCase())
    ];
    
    if (allFeelingNames.includes(feelingName.toLowerCase())) {
        alert('This feeling already exists!');
        return;
    }
    
    // Add the custom feeling
    customFeelings.push({
        name: feelingName,
        emoji: '✨'
    });
    
    saveToLocalStorage();
    renderCustomFeelings();
    
    // Clear input
    customFeelingInput.value = '';
    customFeelingInput.focus();
}

// Delete custom feeling
function deleteCustomFeeling(index) {
    const feeling = customFeelings[index];
    
    if (confirm(`Are you sure you want to delete "${feeling.name}"?`)) {
        // Remove from custom feelings array
        customFeelings.splice(index, 1);
        
        // Remove from selected feelings if it was selected
        selectedFeelings.delete(feeling.name);
        
        saveToLocalStorage();
        renderCustomFeelings();
        renderSelectedFeelings();
    }
}

// Save journal entry
function saveJournalEntry() {
    if (selectedFeelings.size === 0) {
        alert('Please select at least one feeling');
        return;
    }
    
    // Use the date from the form or default to today
    const selectedDate = entryDateInput.value ? new Date(entryDateInput.value) : new Date();
    
    const entry = {
        date: selectedDate.toISOString(),
        feelings: Array.from(selectedFeelings),
        why: entryWhyInput.value.trim(),
        high: entryHighInput.value.trim(),
        low: entryLowInput.value.trim(),
        grateful: entryGratefulInput.value.trim()
    };
    
    journalEntries.unshift(entry); // Add to beginning of array
    
    // Keep only last 10 entries
    if (journalEntries.length > 10) {
        journalEntries = journalEntries.slice(0, 10);
    }
    
    saveToLocalStorage();
    
    // Clear selections and form
    selectedFeelings.clear();
    entryWhyInput.value = '';
    entryHighInput.value = '';
    entryLowInput.value = '';
    entryGratefulInput.value = '';
    
    renderDefaultFeelings();
    renderCustomFeelings();
    renderSelectedFeelings();
    renderJournalEntries();
    
    // Scroll to journal entries
    journalEntriesContainer.scrollIntoView({ behavior: 'smooth' });
}

// Render journal entries
function renderJournalEntries() {
    journalEntriesContainer.innerHTML = '';
    
    if (journalEntries.length === 0) {
        journalEntriesContainer.innerHTML = '<p class="empty-state">No entries yet. Select feelings to create your first entry!</p>';
        return;
    }
    
    journalEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'journal-entry';
        
        const dateDiv = document.createElement('div');
        dateDiv.className = 'entry-date';
        const date = new Date(entry.date);
        dateDiv.textContent = date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const feelingsDiv = document.createElement('div');
        feelingsDiv.className = 'entry-feelings';
        
        entry.feelings.forEach(feeling => {
            const tag = document.createElement('span');
            tag.className = 'entry-feeling-tag';
            tag.textContent = feeling;
            feelingsDiv.appendChild(tag);
        });
        
        entryDiv.appendChild(dateDiv);
        entryDiv.appendChild(feelingsDiv);
        
        // Add entry details if they exist
        if (entry.why) {
            const whyDiv = document.createElement('div');
            whyDiv.className = 'entry-detail';
            const whyLabel = document.createElement('strong');
            whyLabel.textContent = 'Why: ';
            whyDiv.appendChild(whyLabel);
            whyDiv.appendChild(document.createTextNode(entry.why));
            entryDiv.appendChild(whyDiv);
        }
        
        if (entry.high) {
            const highDiv = document.createElement('div');
            highDiv.className = 'entry-detail';
            const highLabel = document.createElement('strong');
            highLabel.textContent = 'High: ';
            highDiv.appendChild(highLabel);
            highDiv.appendChild(document.createTextNode(entry.high));
            entryDiv.appendChild(highDiv);
        }
        
        if (entry.low) {
            const lowDiv = document.createElement('div');
            lowDiv.className = 'entry-detail';
            const lowLabel = document.createElement('strong');
            lowLabel.textContent = 'Low: ';
            lowDiv.appendChild(lowLabel);
            lowDiv.appendChild(document.createTextNode(entry.low));
            entryDiv.appendChild(lowDiv);
        }
        
        if (entry.grateful) {
            const gratefulDiv = document.createElement('div');
            gratefulDiv.className = 'entry-detail';
            const gratefulLabel = document.createElement('strong');
            gratefulLabel.textContent = 'Grateful for: ';
            gratefulDiv.appendChild(gratefulLabel);
            gratefulDiv.appendChild(document.createTextNode(entry.grateful));
            entryDiv.appendChild(gratefulDiv);
        }
        
        journalEntriesContainer.appendChild(entryDiv);
    });
}

// Attach event listeners
function attachEventListeners() {
    addFeelingBtn.addEventListener('click', addCustomFeeling);
    
    customFeelingInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomFeeling();
        }
    });
    
    saveEntryBtn.addEventListener('click', saveJournalEntry);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
