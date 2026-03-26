# 3dLabPrintGarage

A static, single-page website for **3dLabPrintGarage** — a professional 3D printing studio based in Odesa, Ukraine. The site lets potential customers learn about the studio's services, estimate print costs, and get in touch directly.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Key Technologies](#key-technologies)
- [Code Organisation](#code-organisation)
- [Features](#features)
  - [Price Calculator](#price-calculator)
  - [Chat Widget](#chat-widget)
  - [Gallery](#gallery)
  - [Contact Section](#contact-section)
- [Running Locally](#running-locally)
- [Content Management Guide](#content-management-guide)
  - [Change Prices in the Calculator](#1-change-prices-in-the-calculator)
  - [Add or Remove Service Categories (Gallery)](#2-add-or-remove-service-categories-gallery)
  - [Update the Equipment List](#3-update-the-equipment-list)
  - [Update the Services List](#4-update-the-services-list)
  - [Update Contact Information](#5-update-contact-information)
  - [Update Social Media Links](#6-update-social-media-links)
  - [Update the Chatbot Replies](#7-update-the-chatbot-replies)
  - [Add a New Chatbot Keyword](#8-add-a-new-chatbot-keyword)
  - [Update the Page Title and Hero Text](#9-update-the-page-title-and-hero-text)
- [Running Tests](#running-tests)
- [Contributing](#contributing)

---

## Project Overview

The website is a **zero-dependency static web application** — no build tools, no frameworks, no package manager. It is ready to serve directly from any static file host or simply by opening `index.html` in a browser.

The UI is written in Ukrainian (`lang="uk"`) and targets customers inside Ukraine as well as international shipping inquiries.

---

## Repository Structure

```
3dLabPrintGarage/
├── index.html               # Main page — markup, styles, and page-level JS
├── :index.html              # Older backup (filename literally starts with a colon); not served
├── js/
│   ├── calculator.js        # Price calculation logic + material/rate constants
│   ├── chatbot.js           # Chatbot keyword matching and reply strings
│   └── script.js            # Generic arithmetic helper + smooth-scroll setup
├── tests/
│   ├── calculator.test.js   # Jest tests for calculator.js
│   ├── chatbot.test.js      # Jest tests for chatbot.js
│   └── script.test.js       # Jest tests for script.js
├── package.json             # npm scripts and Jest configuration
└── README.md                # Project documentation (this file)
```

---

## Key Technologies

| Technology | Role |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 (inline `<style>`) | All styling — gradients, flexbox, CSS Grid, media queries |
| Vanilla JavaScript (ES6+) | Interactive features — calculator, chat widget, form handler |
| FileReader API | Reading user-selected images inside the chat widget |
| DOM API | Dynamic message rendering, smooth scrolling |
| Jest | Unit tests for the JS business logic |

There are **no runtime third-party dependencies** and **no build step**.

---

## Code Organisation

### `index.html`

The page is split into logical blocks:

| Lines | Block | Description |
|---|---|---|
| 1–6 | `<head>` | Charset, viewport meta, page title |
| 7–191 | `<style>` | All CSS: base reset, layout, component styles, chat widget, responsive breakpoint (`max-width: 768px`) |
| 193–199 | `<nav>` | Sticky navigation bar with anchor links |
| 201–206 | `.hero` | Full-width hero section with headline and CTA button |
| 208–219 | `#gallery` | CSS Grid card gallery of service categories |
| 221–247 | `#calculator` | Price calculator form (weight, time, material inputs) |
| 249–272 | `#about` | Two-column equipment list and services summary |
| 274–304 | `#contact` | Phone numbers, location, social links, and contact form |
| 306–308 | `<footer>` | Copyright line |
| 310–328 | Chat widget HTML | Toggle button, floating panel, message list, input area |
| 330–422 | `<script>` | Page-level JS: price calculation wiring, form handler, chat widget logic |

### `js/calculator.js`

Exports the pricing business logic:

- **`MATERIAL_PRICES`** — object mapping material keys (`pla`, `petg`, `abs`, `resin`) to UAH-per-gram rates.
- **`ELECTRICITY_RATE`** — UAH per hour of print time (default: 3).
- **`BASE_FEE`** — fixed base fee added to every order (default: 50).
- **`computePrice(weight, time, material)`** — calculates and rounds the total cost.

### `js/chatbot.js`

Exports the bot reply logic:

- **`BOT_REPLIES`** — object with pre-written Ukrainian reply strings (`PRICE`, `PHOTO`, `TIME`, `DEFAULT`).
- **`getBotReply(userText)`** — matches user input against Ukrainian keywords and returns the appropriate reply.

### `js/script.js`

- **`calculate(expression)`** — a whitelist-filtered arithmetic evaluator. Only digits and `+ - * / . ( )` are accepted; all other input returns `'Error'`.
- **Smooth-scroll handler** — attaches a `click` listener to every `a[href^="#"]` anchor.

---

## Features

### Price Calculator

Located in `#calculator`. Runs entirely client-side with no server calls.

**Pricing formula:**

```
total = (weight × material_rate) + (print_hours × electricity_rate) + base_fee
```

| Material | Rate |
|---|---|
| PLA | 5 грн / г |
| PETG | 7 грн / г |
| ABS | 6 грн / г |
| Resin (смола) | 3 грн / мл |

The result updates live on every `input`/`change` event.

---

### Chat Widget

A fixed-position support chat panel in the bottom-right corner.

**Behaviour:**
- Click the 🌙 toggle button to open/close the panel.
- On first open, the bot sends an automated greeting.
- Keyword-matching replies handle common questions about price, turnaround time, and photo submission.
- Users can attach a photo via the 📷 button; the image is read with `FileReader` and displayed inline — no upload to a server occurs.

**Bot reply keywords:**

```
"ціна" / "вартість" / "скільки"  → refer to the calculator
"фото" / "зображ" / "картин"     → prompt to use the 📷 button
"час" / "терм"                   → "1–3 business days"
anything else                     → generic "manager will contact you" reply
```

---

### Gallery

A CSS Grid section (`#gallery`) displaying service categories as card tiles.

---

### Contact Section

Three contact cards plus an inline enquiry form:

- **Phone numbers**: three Ukrainian mobile numbers (`+380…`)
- **Location**: Odesa, Ukraine — with a note about nationwide and international shipping
- **Social media**: Instagram (`@3druk_odesa`, `@3dlabprintgarage`) and X/Twitter (`@3dlabprintfcgy`)
- **Contact form**: name, e-mail, project description — `handleSubmit` prevents default browser submission and shows a confirmation alert

---

## Running Locally

No installation or build step is required.

```bash
# Option 1 — open directly in a browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Option 2 — serve with any static file server (e.g. Python's built-in one)
python3 -m http.server 8080
# then visit http://localhost:8080

# Option 3 — serve with Node.js npx
npx serve .
# then visit the URL printed in the terminal
```

---

## Content Management Guide

All content is managed by editing plain text files — no CMS, no database, no login. Open the relevant file in any text editor (VS Code, Notepad++, Sublime Text, etc.), make your change, save, and refresh the browser.

---

### 1. Change Prices in the Calculator

**File:** `js/calculator.js`

```js
const MATERIAL_PRICES = {
    pla:   5,   // ← UAH per gram for PLA
    petg:  7,   // ← UAH per gram for PETG
    abs:   6,   // ← UAH per gram for ABS
    resin: 3,   // ← UAH per ml for Resin
};

const ELECTRICITY_RATE = 3;  // ← UAH per hour of print time
const BASE_FEE = 50;         // ← fixed fee added to every order
```

Change any number and save. The calculator on the page will use the new values immediately on next page load.

You must also update the matching labels in `index.html` (around line 235) so customers see the correct rates:

```html
<option value="pla">PLA - 5 грн/г</option>   <!-- change "5" to match MATERIAL_PRICES.pla -->
<option value="petg">PETG - 7 грн/г</option>  <!-- change "7" to match MATERIAL_PRICES.petg -->
<option value="abs">ABS - 6 грн/г</option>    <!-- change "6" to match MATERIAL_PRICES.abs  -->
<option value="resin">Смола - 3 грн/мл</option> <!-- change "3" to match MATERIAL_PRICES.resin -->
```

---

### 2. Add or Remove Service Categories (Gallery)

**File:** `index.html` — look for the `#gallery` section (around line 208).

**To add a card:**

```html
<div class="gallery-grid">
    <!-- existing cards … -->
    <div class="gallery-item">🖨️ Назва нової послуги</div>  <!-- ← add this line -->
</div>
```

Pick any emoji that fits your new service, write the Ukrainian name, save, and reload.

**To remove a card**, delete the corresponding `<div class="gallery-item">…</div>` line.

---

### 3. Update the Equipment List

**File:** `index.html` — find the `#about` section (around line 249).

```html
<ul>
    <li><strong>2x Bambulabs A1</strong> - Опис</li>  <!-- edit or remove lines here -->
    <li><strong>Новий принтер</strong> - Опис</li>    <!-- ← add a new line like this -->
</ul>
```

---

### 4. Update the Services List

**File:** `index.html` — find the second `<ul>` in the `#about` section (around line 263).

```html
<ul>
    <li>✅ Нова послуга</li>  <!-- ← add a new line; remove any line you no longer offer -->
</ul>
```

---

### 5. Update Contact Information

**File:** `index.html` — find the `#contact` section (around line 274).

**Phone numbers** (around line 278):

```html
<p><a href="tel:+380XXXXXXXXX">+38 (0XX) XXX-XX-XX</a></p>
```

Replace the number in both `href="tel:+380…"` (digits only, no spaces) and the display text.

**Location / delivery note** (around line 285):

```html
<p>Одеса, Україна</p>
<p>Доставка по всій Україні та за кордон</p>
```

---

### 6. Update Social Media Links

**File:** `index.html` — find the social media block inside `#contact` (around line 289).

```html
<p><a href="https://instagram.com/YOUR_HANDLE" target="_blank">@YOUR_HANDLE</a></p>
```

Replace the URL and display text for each platform.

---

### 7. Update the Chatbot Replies

**File:** `js/chatbot.js`

```js
const BOT_REPLIES = {
    PRICE:   'Для розрахунку вартості…',   // ← edit this text
    PHOTO:   'Надішліть фото через кнопку…', // ← edit this text
    TIME:    'Зазвичай ми виконуємо…',      // ← edit this text
    DEFAULT: 'Дякуємо за повідомлення!…',   // ← edit this text
};
```

---

### 8. Add a New Chatbot Keyword

**File:** `js/chatbot.js` — inside `getBotReply`:

```js
function getBotReply(userText) {
    const lower = (userText || '').toLowerCase();
    // … existing checks …

    // Add a new keyword group like this:
    if (lower.includes('доставка') || lower.includes('відправка')) {
        return 'Доставляємо Новою Поштою по всій Україні та за кордон. 🚚';
    }

    return BOT_REPLIES.DEFAULT;
}
```

Insert your new `if` block **before** the final `return BOT_REPLIES.DEFAULT` line.

---

### 9. Update the Page Title and Hero Text

**File:** `index.html`

- **Browser tab title** (line 6): `<title>3dLabPrintGarage - Студія 3D Друку в Одесі</title>`
- **Hero headline** (around line 202): `<h2>3dLabPrintGarage</h2>`
- **Hero tagline** (around line 203): `<p>Втілюємо ваші ідеї в реальність</p>`
- **Hero sub-text** (around line 204): `<p style="…">Професійна 3D друк. Швидко. Якісно. Доступно.</p>`
- **Footer copyright** (around line 307): `<p>&copy; 2026 3dLabPrintGarage. Всі права захищені.</p>`

---

## Running Tests

The project uses [Jest](https://jestjs.io/) to test the JavaScript business logic.

```bash
# Install dependencies (first time only)
npm install

# Run all tests
npm test

# Run tests and see coverage report
npm test -- --coverage
```

Tests live in the `tests/` directory and cover `calculator.js`, `chatbot.js`, and `script.js`.

---

## Contributing

1. Fork the repository and create a feature branch.
2. Edit `index.html` and/or the relevant file in `js/` — no build step needed.
3. Open `index.html` in a browser to verify your changes visually.
4. Run `npm test` to make sure all tests still pass.
5. Submit a pull request with a clear description of the change.