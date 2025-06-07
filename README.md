# NHS One-Page Website

A mobile-first, responsive one-page website for NHS participant selection/survey system built with vanilla HTML, CSS, and JavaScript.

## Features

- **Mobile-First Design**: Optimized for mobile devices with responsive breakpoints
- **Multi-Step Form**: 5-step form with progress tracking and validation
- **Real-Time Validation**: Immediate feedback with visual state changes
- **Data Persistence**: Auto-save form data to localStorage
- **Registration Banner**: Fixed bottom banner tracking completion status
- **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- **Multi-Language Support**: Built-in translation system (English/Spanish included)
- **Progressive Enhancement**: Works without JavaScript
- **NHS Design System**: Official NHS colors, typography, and styling

## File Structure

```
/
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main stylesheet
│   ├── components.css     # Component-specific styles
│   └── responsive.css     # Media queries and responsive design
├── js/
│   ├── main.js           # Main application logic
│   ├── form-handler.js   # Form validation and step management
│   └── utils.js          # Utility functions
├── ARCHITECTURE.md       # Technical architecture documentation
└── README.md            # This file
```

## Getting Started

1. **Simple Deployment**: Upload all files to a web server
2. **Local Development**: Open `index.html` in a web browser
3. **Live Server**: Use any local server (Python, Node.js, etc.)

### Using Python (if available):
```bash
python -m http.server 8000
# Visit http://localhost:8000
```

### Using Node.js (if available):
```bash
npx serve .
# Visit the provided URL
```

## Usage

### Form Navigation
- **Next/Previous Buttons**: Navigate between steps
- **Registration Banner**: Click when all fields are completed
- **Keyboard Shortcuts**:
  - `Ctrl + Arrow Left/Right`: Navigate between steps
  - `Alt + 1-5`: Jump to specific step
  - `Alt + R`: Reset form
  - `Alt + H`: Show keyboard help

### Form Validation
- **Real-time validation**: Fields change color as you type
- **Visual States**:
  - Gray: Empty field
  - Green: Valid field
  - Red: Invalid field
- **Required fields**: Must be completed to proceed

### Data Persistence
- Form data automatically saves to browser storage
- Data restored on page refresh
- Cleared on successful submission

### Language Support
- Language selector in top-right corner
- Supports English and Spanish (extensible)
- RTL language support for Arabic/Urdu

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari 12+, Android Chrome 70+
- **Progressive Enhancement**: Basic functionality in older browsers

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and announcements
- **Focus Management**: Logical tab order
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user motion preferences

## Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --color-background: #F0F0F0;
  --color-gray-default: #D9D9D9;
  --color-green-approval: #66D575;
  --color-blue-banner: #31B7FF;
  --color-black-selection: #000000;
  --color-white-option: #FFFFFF;
  --color-red-reject: #FF4444;
}
```

### Typography
Modify font variables in `css/styles.css`:
```css
:root {
  --font-family: Helvetica, Arial, sans-serif;
  --font-size-h1-desktop: 80px;
  --font-size-h2-desktop: 50px;
  /* ... */
}
```

### Form Fields
Add new fields in `index.html` and update validation rules in `js/form-handler.js`:
```javascript
this.validationRules = {
  newField: {
    required: true,
    validator: (value) => value.length > 0,
    message: 'Please enter a value'
  }
};
```

## Development

### Debug Mode
Add `?debug=true` to the URL to enable debug mode:
```
http://localhost:8000/?debug=true
```

### URL Parameters
- `?lang=es`: Set language
- `?step=3`: Start at specific step
- `?debug=true`: Enable debug mode

### Adding Translations
1. Add translations to `js/main.js` in the `I18nSystem.loadTranslationFile()` method
2. Add language code to `supportedLanguages` array
3. Update language selector options

## Performance

- **Optimized CSS**: Mobile-first approach
- **Minimal JavaScript**: Vanilla JS, no frameworks
- **Efficient DOM**: Event delegation and debouncing
- **Local Storage**: Client-side data persistence

## Security Considerations

- **Client-side validation**: Always validate on server-side too
- **Data storage**: localStorage data stays on user's device
- **No external dependencies**: All code is self-contained

## Deployment

### Static Hosting
Upload files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Traditional web hosting

### Server Integration
For server-side form processing:
1. Update form action in `index.html`
2. Modify `handleSubmit()` in `js/form-handler.js`
3. Add server-side validation

## License

This project follows NHS digital service standards and is intended for NHS use.

## Support

For technical issues or questions about implementation, refer to the `ARCHITECTURE.md` file for detailed technical specifications. 