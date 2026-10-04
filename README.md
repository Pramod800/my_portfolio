# Pramod Timilsina – portfolio

A single-page portfolio built with plain HTML, CSS and JavaScript. No build step.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## How it is put together

- `index.html` – all content. Each project is an `<article class="project">` in the Work section.
- `css/styles.css` – colours and fonts are CSS variables at the top of the file. Each app has its own `--tint` colour (`.app-weather`, `.app-movies`, ...).
- `js/script.js` – copies each project's phone screen into the sticky phone and swaps it as you scroll, plus the "Copy address" button.

### The phone

On wide screens a phone stays beside the project list and shows the screen of the project you are reading. On narrow screens each project shows its own phone instead. The site still works with JavaScript turned off.

The screens are drawn in HTML and CSS; they are sketches, not screenshots. To use a real screenshot for a project, replace the contents of its `<div class="screen">` with an image sized 250 × 540.

### Adding a project

1. Copy an existing `<article class="project">` block and give it a new `id`, `data-app` and `app-*` class.
2. Add a matching `--tint` colour in `css/styles.css`.
3. Add an icon link for it in the `home-grid` inside the phone.

## Deploy

The site is static, so GitHub Pages works: Settings > Pages > deploy from the `main` branch.
