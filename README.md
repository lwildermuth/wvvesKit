# wvvesKit

A lightweight modal popup for creating step-by-step tutorials and onboarding experiences.

## Features

- 🎯 **Step-by-step tutorials** - Guide users through complex workflows
- 🎨 **Customizable themes** - Match your brand colors and styles
- ✅ **Interactive options** - Allow users to select multiple choices per step
- 📱 **Responsive design** - Works on all screen sizes
- 🚀 **Zero dependencies** - Pure vanilla JavaScript
- 💫 **Smooth animations** - Elegant transitions between steps

## Installation

```bash
npm install wvveskit
```

## Quick Start

```javascript
const wvveskit = require('wvveskit');

const tutorial = new wvveskit({
  title: 'Getting Started',
  steps: [
    {
      content: 'Welcome to our app! Let\'s get you started.',
    },
    {
      content: 'What would you like to do first?',
      options: [
        'Create a new project',
        'Import existing data',
        'Browse templates'
      ]
    }
  ]
});

tutorial.init();
```

## API Reference

### Constructor Options

```javascript
new wvveskit({
  title: 'Assistant',           // Global title displayed in header
  steps: [],                    // Array of step objects
  theme: {                      // Optional theme customization
    backgroundColor: '#ffffff',
    textColor: '#333333',
    buttonBg: 'rgba(0, 0, 0, 0.1)',
    buttonHoverBg: 'rgba(0, 0, 0, 0.15)',
    borderColor: '#cccccc',
    borderRadius: '16px',
    buttonRadius: '12px'
  }
})
```

### Step Object Structure

```javascript
{
  content: 'Step description',   // Main text content
  options: [                     // Optional array of selectable options
    'Option 1',
    'Option 2',
    { text: 'Custom Option' }
  ]
}
```

### Methods

- `init()` - Initialize and show the tutorial
- `next()` - Navigate to next step
- `prev()` - Navigate to previous step
- `close()` - Close the tutorial
- `getSelectedOptions()` - Returns object with selected options by step index
- `showStep(index)` - Jump to specific step

### Theme Customization

```javascript
const tutorial = new wvveskit({
  theme: {
    backgroundColor: '#1a1a1a',
    textColor: '#ffffff',
    buttonBg: 'rgba(255, 255, 255, 0.1)',
    buttonHoverBg: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#444444',
    borderRadius: '20px',
    buttonRadius: '10px'
  }
});
```

## Examples

### Basic Tutorial

```javascript
const tutorial = new wvveskit({
  title: 'App Tour',
  steps: [
    { content: 'Welcome! This is your dashboard.' },
    { content: 'Here you can manage your projects.' },
    { content: 'Click here to create your first project.' }
  ]
});

tutorial.init();
```

### Interactive Tutorial with Options

```javascript
const tutorial = new wvveskit({
  title: 'Setup Wizard',
  steps: [
    {
      content: 'What type of project are you creating?',
      options: ['Web App', 'Mobile App', 'Desktop App']
    },
    {
      content: 'Which framework would you prefer?',
      options: ['React', 'Vue', 'Angular', 'Vanilla JS']
    },
    {
      content: 'Great! Your project is ready to go.'
    }
  ]
});

tutorial.init();

// Get user selections after completion
const selections = tutorial.getSelectedOptions();
console.log(selections); // { 0: [1], 1: [0] }
```

### Dark Theme Example

```javascript
const darkTutorial = new wvveskit({
  title: 'Dark Mode Tour',
  theme: {
    backgroundColor: '#2d3748',
    textColor: '#f7fafc',
    buttonBg: 'rgba(255, 255, 255, 0.1)',
    buttonHoverBg: 'rgba(255, 255, 255, 0.2)',
    borderColor: '#4a5568'
  },
  steps: [
    { content: 'Welcome to dark mode!' }
  ]
});

darkTutorial.init();
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

ISC