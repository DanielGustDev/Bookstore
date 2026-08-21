# 📚 Bookstore

An interactive web application for managing and displaying a book collection, built with JavaScript, HTML5, and CSS3.

---

## 🚀 Features

- **Dynamic Book Display:** Clear presentation of book titles, authors, prices, published years, and genres.
- **Like System:** Interactive like button with a counter and persistence for liked books.
- **Favorites Modal:** Dialog window to view a summary of all personally liked books.
- **Comment System:** Read existing comments and post new comments for any book.
- **Persistent Storage:** LocalStorage integration to save user interactions (likes and comments) across browser sessions.
- **Responsive Layout:** Optimized design for smooth usage across various screen sizes.

---

## 📁 Project Structure

Bookstore/
├── assets/
│ ├── fonts/ # Local web fonts
│ ├── icons/ # SVG icons (book, heart, send)
│ └── imgs/ # Image assets
├── scripts/
│ ├── database.js # Initial data array (books database)
│ └── templates.js # HTML template generators
├── styles/
│ ├── assets.css # Asset and component styles
│ ├── fonts.css # Font face definitions
│ ├── standard.css # Global resets and base styles
│ └── variables.css # CSS custom properties (colors, spacing)
├── index.html # Main HTML document
├── jsconfig.json # JavaScript project configuration (Linter/JSDoc)
├── README.md # Project documentation
├── script.js # Main application logic and state management
└── style.css # Custom page-specific stylesheet

---

## 🛠️ Technologies & Tools

- **HTML5:** Semantic markup utilizing `<dialog>`, `<main>`, `<article>`, and form elements.
- **CSS3:** Modular styling powered by CSS custom properties (variables).
- **JavaScript (ES6+):** Pure Vanilla JS without external frameworks or dependencies.
- **JSDoc:** Type annotations for clean code architecture and editor auto-completion.

---

## ⚡ Quick Start

1. **Clone or download the repository:**
   `git clone <REPOSITORY_URL>`

2. **Run the application:**
   Open `index.html` directly in any web browser or launch it using a local development server (e.g., VS Code _Live Server_).

---

## 📝 Usage

- **View Favorites:** Click the heart icon in the header navigation to open the liked books modal dialog.
- **Like a Book:** Click the heart icon inside any book card to toggle its liked status.
- **Add a Comment:** Type a message into the comment input field below a book and submit it by clicking the send button or pressing Enter.
