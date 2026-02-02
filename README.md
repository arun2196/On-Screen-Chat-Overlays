# StreamElements Chat Overlay

This repository contains the code and settings for a **custom chat overlay built for StreamElements**.

It’s meant to be used as a **Custom Widget inside StreamElements** and displayed in OBS via a browser source during live streams.

---

## A quick heads-up

This is **not a standalone web app**.

StreamElements runs widgets inside its own environment and provides:
- widget fields (settings UI),
- runtime data like chat messages and events,
- StreamElements-specific variables and APIs.

Because of that:
- the overlay **cannot be fully run or tested on its own**,
- some parts of the JavaScript rely on StreamElements being present.

You *can* preview layout, styles, and animations locally, but **full behavior only works inside StreamElements**.

---

## Repository structure

chat-overlay/
├─ index.html # Overlay markup
├─ style.css # Styling, layout, animations
├─ app.js # Overlay logic (chat rendering, config, events)
│
├─ assets/ # Optional local assets (images, gifs, etc.)
│
└─ streamelements/
├─ fields.json # Widget field definitions (settings UI in StreamElements)
└─ data.json # Default / current widget values


- `fields.json` defines which settings appear in the StreamElements widget UI.
- `data.json` contains the values used by the widget.
- Both files are stored here for **backup, version control, and reproducibility**.

---

## How to use this overlay

### Inside StreamElements
1. Create or open a **Custom Widget** in StreamElements.
2. Copy and paste:
   - `index.html` → HTML editor
   - `style.css` → CSS editor
   - `app.js` → JavaScript editor
3. Paste the contents of `fields.json` into the **Fields** section.
4. Adjust settings using the StreamElements UI.

---

### Local development (limited)
Local development is useful for:
- layout and positioning,
- styling and animations,
- basic DOM behavior.

It does **not** simulate real chat messages or StreamElements events.

To preview locally:
- Serve `index.html` using a local web server (for example, VS Code’s Live Server extension).
- Some StreamElements-specific code may be disabled or mocked when running locally.

---

## Why this repository exists

This repo is mainly here to:
- keep the overlay code and settings under version control,
- safely experiment and refactor without breaking the live overlay,
- make it easy to roll back or reproduce a working setup,
- act as a small real-world example of a streaming UI project.

---


### Asset hosting note

Some image and GIF assets used by the overlay are currently hosted externally for convenience.
These assets are referenced via direct URLs in the code.

A future improvement will be to migrate all assets to a stable CDN (for example, GitHub Pages or a dedicated asset host) to further improve reliability and long-term maintainability.


## License

Provided as-is for personal use and experimentation.

