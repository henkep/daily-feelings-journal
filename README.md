# ✨ Daily Feelings Journal

A beautiful, modern web application for tracking daily moods and feelings. This personal journal helps track emotional wellbeing through daily entries with feelings, reflections, highs, lows, and gratitude.

![Daily Feelings Journal](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple.svg)
![License](https://img.shields.io/badge/License-Private-red.svg)

## 🌟 Features

- **Daily Entry Form** with intuitive interface
  - Date picker (defaults to today)
  - Visual feeling selector with 6 emotions: Happy, Strong, Calm, Scared, Mad, Sad
  - Reflection prompts: Why, High of the day, Low of the day, Gratitude
  
- **Past Entries View**
  - Chronologically sorted entries (newest first)
  - Beautiful card-based layout
  - Edit and delete capabilities
  
- **Modern Design**
  - Calming gradient background
  - Smooth animations and transitions
  - Emoji-enhanced feelings
  - Responsive layout
  - Clean, spacious interface

- **Local Storage**
  - All data stored locally in your browser
  - No server required
  - Complete privacy

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16.0 or higher)
- npm (comes with Node.js)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/henkep/daily-feelings-journal.git
   cd daily-feelings-journal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃 Running Locally

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The app will automatically reload when you make changes

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` folder.

To preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
/
├── README.md
├── .gitignore
├── package.json
├── index.html
├── vite.config.js
└── src/
    ├── App.jsx              # Main application component
    ├── App.css              # App-level styles
    ├── main.jsx             # Application entry point
    ├── index.css            # Global styles
    ├── components/
    │   ├── EntryForm.jsx    # Daily entry form component
    │   ├── EntryForm.css
    │   ├── FeelingSelector.jsx  # Feeling picker component
    │   ├── FeelingSelector.css
    │   ├── EntryList.jsx    # List of past entries
    │   ├── EntryList.css
    │   ├── EntryCard.jsx    # Individual entry card
    │   └── EntryCard.css
    └── utils/
        └── storage.js       # localStorage utilities
```

## 💾 Data Storage

All journal entries are stored locally in your browser's localStorage. The data structure includes:
- Unique ID
- Date
- Primary feeling (Happy, Strong, Calm, Scared, Mad, or Sad)
- Why (explanation)
- High of the day
- Low of the day
- Gratitude

**Note:** Data is stored locally on your device. Clearing browser data will remove all entries.

## 🎨 Customization

The application uses CSS custom properties for easy theming. You can modify colors and styles in the respective CSS files:
- `src/App.css` - Main app styling and gradients
- `src/components/*.css` - Component-specific styles

## 🛠️ Technology Stack

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **CSS3** - Styling with animations and transitions
- **localStorage API** - Data persistence

## 📝 Usage Tips

1. **Daily Entries**: Create entries regularly to track emotional patterns
2. **Edit Anytime**: Click the edit icon (✏️) on any past entry to modify it
3. **Delete Entries**: Click the trash icon (🗑️) to remove unwanted entries
4. **Reflection**: Take time to thoughtfully answer each prompt for better insights

## 🔒 Privacy

This application runs entirely in your browser. No data is sent to any server or third party. All journal entries remain private on your local device.

## 🤝 Contributing

This is a private repository. For questions or issues, please contact the repository owner.

## 📄 License

Private - All rights reserved

---

Made with ❤️ for tracking daily feelings and emotional wellbeing
