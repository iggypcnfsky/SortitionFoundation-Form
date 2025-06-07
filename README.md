# NHS Participant Registration Form

A multilingual registration form for NHS participant selection and registration, built for the Sortition Foundation.

## 🌍 Languages Supported

- 🇬🇧 English
- 🇮🇳 हिंदी (Hindi)
- 🇨🇳 中文 (Chinese)
- 🇵🇱 Polski (Polish)
- 🇷🇺 Русский (Russian)
- 🇪🇸 Español (Spanish)
- 🇩🇪 Deutsch (German)

## 🚀 Deployment

This project is configured for deployment on Netlify with the following files:

- `netlify.toml` - Main Netlify configuration
- `_redirects` - URL redirect rules
- `_headers` - Security and performance headers
- `package.json` - Project metadata and scripts

### Deploy to Netlify

1. **Connect your repository** to Netlify
2. **Build settings** are automatically configured via `netlify.toml`
3. **Deploy** - No build process required (static site)

### Manual Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod
```

## 📁 Project Structure

```
CODE/
├── index.html                 # Main HTML file
├── css/                      # Stylesheets
│   ├── styles.css
│   ├── components.css
│   └── responsive.css
├── js/                       # JavaScript files
│   ├── main.js
│   ├── form-handler.js
│   └── utils.js
├── assets/                   # Static assets
│   ├── images/              # Images and logos
│   ├── fonts/               # Font files
│   └── translations/        # Translation JSON files
│       ├── en.json          # English
│       ├── hi.json          # Hindi
│       ├── zh.json          # Chinese
│       ├── pl.json          # Polish
│       ├── ru.json          # Russian
│       ├── es.json          # Spanish
│       └── de.json          # German
├── netlify.toml             # Netlify configuration
├── _redirects               # Netlify redirects
├── _headers                 # Netlify headers
├── package.json             # Project metadata
└── README.md               # This file
```

## 🔧 Features

- **Multilingual Support**: 7 languages with flag emojis
- **Responsive Design**: Works on all devices
- **Progressive Form**: Step-by-step registration process
- **Data Validation**: Client-side form validation
- **Accessibility**: ARIA labels and semantic HTML
- **Security Headers**: CSP and security headers configured
- **Performance**: Optimized caching and compression

## 🛠 Local Development

```bash
# Serve locally using Python
python -m http.server 8000

# Or using Python 3
python3 -m http.server 8000

# Visit http://localhost:8000
```

## 📝 Translation System

The translation system uses JSON files located in `assets/translations/`. Each file contains all the text strings used in the form, organized by section:

- `form.step1` - Eligibility confirmation
- `form.step2` - Contact details
- `form.step3` - Demographics
- `form.step4` - Data consent
- `form.step5` - Event information
- `header` - Page header content
- `language` - Language selector labels
- `video` - Video section text
- `contact` - Contact information
- `scroll` - Scroll indicator
- `banner` - Registration banner

## 🔒 Security

- Content Security Policy (CSP) headers
- XSS protection
- Frame options to prevent clickjacking
- Secure referrer policy
- Content type validation

## 📊 Performance

- Static file caching (1 year for assets)
- Translation file caching (1 hour)
- HTML cache invalidation
- Optimized image loading
- Minified and compressed assets

## 📞 Support

For questions or support, contact:
- **Phone**: 0800 009 6486 (8am–8pm daily)
- **Email**: nhs@sortitionfoundation.org
- **Privacy**: privacy@sortitionfoundation.org

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ by the Sortition Foundation for NHS participant engagement. 