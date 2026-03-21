# 3dLabPrintGarage

A static, single-page website for **3dLabPrintGarage** — a professional 3D printing studio based in Odesa, Ukraine. The site lets potential customers learn about the studio's services, estimate print costs, and get in touch directly.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Repository Structure](#repository-structure)
- [Key Technologies](#key-technologies)
- [Code Organisation](#code-organisation)
  - [index.html](#indexhtml)
  - [js/script.js](#jsscriptjs)
- [Features](#features)
  - [Price Calculator](#price-calculator)
  - [Chat Widget](#chat-widget)
  - [Gallery](#gallery)
  - [Contact Section](#contact-section)
- [Running Locally](#running-locally)
- [Contributing](#contributing)

---

## Project Overview

The website is a **zero-dependency static web application** — no build tools, no frameworks, no package manager. It is ready to serve directly from any static file host or simply by opening `index.html` in a browser.

The UI is written in Ukrainian (`lang="uk"`) and targets customers inside Ukraine as well as international shipping inquiries.

---

## Repository Structure

```
3dLabPrintGarage/
├── index.html      # Main (and only) page — markup, styles, and JS all in one file
├── js/
│   └── script.js   # Tiny external script: generic calculator helper + smooth-scroll
└── README.md       # Project documentation (this file)
```

> **`:index.html`** is an older backup of the page kept in the repository root. It is not served.

---

## Key Technologies

| Technology | Role |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 (inline `<style>`) | All styling — gradients, flexbox, CSS Grid, media queries |
| Vanilla JavaScript (ES6+) | Interactive features — calculator, chat widget, form handler |
| FileReader API | Reading user-selected images inside the chat widget |
| DOM API | Dynamic message rendering, smooth scrolling |

There are **no third-party dependencies** and **no build step**.

---

## Code Organisation

### `index.html`

The entire application lives in this single file, split into logical blocks:

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
| 330–442 | `<script>` | All JavaScript: price calculation, form handler, chat widget logic |

### `js/script.js`

A small external helper loaded alongside the inline script:

- **`calculate(expression)`** — a generic `eval`-based expression evaluator (used as a utility). **Note:** using `eval` to evaluate arbitrary expressions is a known security risk; never pass untrusted user input to this function.
- **Smooth-scroll handler** — attaches a `click` listener to every `a[href^="#"]` anchor so navigation links scroll smoothly.

---

## Features

### Price Calculator

Located in `#calculator`. Runs entirely client-side with no server calls.

**Pricing formula:**

```
total = (weight × material_rate) + (print_hours × 3) + 50
```

| Material | Rate |
|---|---|
| PLA | 5 грн / г |
| PETG | 7 грн / г |
| ABS | 6 грн / г |
| Resin (смола) | 3 грн / мл |

The `+50 грн` is a fixed base fee. The result updates live on every `input`/`change` event (no submit button needed).

**Key function** (`index.html`, `calculatePrice`):

```js
function calculatePrice() {
    const weight   = parseFloat(document.getElementById('weight').value) || 0;
    const time     = parseFloat(document.getElementById('time').value)   || 0;
    const material = document.getElementById('material').value;

    const rates = { pla: 5, petg: 7, abs: 6, resin: 3 };
    const total = weight * (rates[material] ?? 0) + time * 3 + 50;
    document.getElementById('price').textContent = Math.round(total) + ' грн';
}
```

---

### Chat Widget

A fixed-position support chat panel in the bottom-right corner.

**Behaviour:**
- Click the 🌙 toggle button to open/close the panel.
- On first open, the bot sends an automated greeting.
- Keyword-matching replies handle common questions about price, turnaround time, and photo submission.
- Users can attach a photo via the 📷 button; the image is read with `FileReader` and displayed inline — no upload to a server occurs.

**Bot reply logic** (`botReply` in `index.html`):

```
keyword contains "ціна" / "вартість" / "скільки"  → refer to the calculator
keyword contains "фото" / "зображ" / "картин"     → prompt to use the 📷 button
keyword contains "час" / "терм"                   → "1–3 business days"
anything else                                      → generic "manager will contact you" reply
```

---

### Gallery

A CSS Grid section (`#gallery`) displaying seven service categories as card tiles:

| Emoji | Service |
|---|---|
| 🔧 | Functional parts |
| 📦 | Electronics enclosures |
| 🎯 | Prototyping |
| 🛠️ | DIY projects |
| 🎨 | Miniatures & figures |
| 🚗 | Auto parts |
| 🍣 | Food souvenirs |

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
```

---

## Contributing

1. Fork the repository and create a feature branch.
2. Edit `index.html` and/or `js/script.js` — no build step needed.
3. Open `index.html` in a browser to verify your changes visually.
4. Submit a pull request with a clear description of the change.