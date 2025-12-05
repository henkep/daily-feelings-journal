# daily-feelings-journal
A beautiful, modern web app to track Karl's daily moods and feelings

## Features

- **6 Default Feelings**: Happy, Strong, Calm, Scared, Mad, Sad - always available at the top
- **Custom Feelings**: Add unlimited personalized feelings with the "Add Feeling" button
- **Data Persistence**: All custom feelings and journal entries are saved in localStorage
- **Delete Custom Feelings**: Remove custom feelings with the × button (default feelings cannot be deleted)
- **Journal Entries**: Save your selected feelings with timestamps
- **Beautiful UI**: Clean, modern design with gradient colors and smooth animations

## How to Use

1. Open `index.html` in your web browser
2. Click on any feeling (default or custom) to select it
3. Add your own custom feelings using the input field and "Add Feeling" button
4. Once you've selected your feelings, click "Save Entry" to create a journal entry
5. Delete custom feelings by clicking the × button (confirmation required)

## Local Development

Simply open `index.html` in a web browser, or use a local HTTP server:

```bash
python3 -m http.server 8080
```

Then navigate to `http://localhost:8080`

## Files

- `index.html` - Main application structure
- `styles.css` - All styling and animations
- `app.js` - Application logic and localStorage management
