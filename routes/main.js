// routes/main.js
// Route module with a shared nav + page template so every page is navigable.

const express = require("express");
const path = require("path");

const router = express.Router();

/* ---------- Shared layout helpers ---------- */

// Inline-styled navigation:
// - Left: quick page links
// - Right: Welcome form redirects to /welcome/:name
// - Uses flex + flex-wrap so it wraps nicely on narrow screens
const NAV = `
  <nav
    style="
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:1rem;
      flex-wrap:wrap;
      margin-bottom:1rem;
      padding:.5rem .75rem;
      border:1px solid #e5e7eb;
      border-radius:.55rem;
      background:#fff;
      font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    "
  >
    <!-- Left group: page links -->
    <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
      <a href="/"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         Home
      </a>
      <a href="/about"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         About
      </a>
      <a href="/contact"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         Contact
      </a>
      <a href="/date"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         Date
      </a>
      <a href="/chain"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         Chain
      </a>
      <a href="/file"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         File
      </a>
      <a href="/a.html"
         style="text-decoration:none;padding:.25rem .6rem;border:1px solid #e5e7eb;border-radius:.55rem;display:inline-block">
         a.html
      </a>
    </div>

    <!-- Right group: Welcome form (redirects to /welcome/:name) -->
    <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap">
      <!-- Accessibility: explicit label for the input -->
      <label for="welcome-name" style="color:#666;font-size:.95rem;margin-right:.1rem">
        <span>Welcome:</span>
      </label>

      <!-- GET /welcome?name=... → server redirects to /welcome/:name -->
      <form action="/welcome" method="get" style="display:inline-flex;gap:.5rem;align-items:center">
        <!-- Required input with placeholder and aria-label -->
        <input
          id="welcome-name"
          type="text"
          name="name"
          placeholder="Enter your name"
          aria-label="name"
          required
          style="
            padding:.35rem .55rem;
            border:1px solid #e5e7eb;
            border-radius:.55rem;
            min-width:12ch;
          "
        />
        <!-- Submit to trigger the redirect -->
        <button
          type="submit"
          style="
            padding:.35rem .7rem;
            border:1px solid #e5e7eb;
            border-radius:.55rem;
            background:#f6f6f6;
            cursor:pointer;
          "
          onmouseover="this.style.filter='brightness(0.98)';"
          onmouseout="this.style.filter='';"
        >
          Go
        </button>
      </form>
    </div>
  </nav>
`;


// Minimal valid HTML wrapper with a shared nav and page title
function renderPage(title, bodyHtml) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; line-height:1.5; margin: 1.25rem; }
    nav a { text-decoration: none; padding: .25rem .5rem; border: 1px solid #ddd; border-radius: .5rem; }
    nav a:hover { background: #f6f6f6; }
  </style>
</head>
<body>
  ${NAV}
  ${bodyHtml}
</body>
</html>`;
}

/* ---------- Basic pages ---------- */

// GET /
router.get("/", (_req, res) => {
  res.send(renderPage("Home", `
    <h1>Hello World!</h1>
    <p>This is the home page. Use the navigation links above.</p>
  `));
});

// GET /about
router.get("/about", (_req, res) => {
  res.send(renderPage("About", `
    <h1>This is the about page</h1>
    <p>Express Lab 4 demo.</p>
  `));
});

// GET /contact
router.get("/contact", (_req, res) => {
  res.send(renderPage("Contact", `
    <h1>Contact</h1>
    <p>Student: Zhan Ru (ID: 33724876)</p>
    <p>Email: <a href="mailto:gru001@gold.ac.uk">gru001@gold.ac.uk</a></p>
  `));
});

// GET /date
router.get("/date", (_req, res) => {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Europe/London", timeZoneName: "short",
  }).format(new Date());

  res.send(renderPage("Date", `
    <h1>Current server date/time</h1>
    <p>${formatted}</p>
  `));
});

/* ---------- Extension tasks (Part D) ---------- */

// FIXED: GET /welcome → redirect to /welcome/:name if ?name= is present,
// otherwise show a small form page (works with the nav form and direct visits).
router.get("/welcome", (req, res) => {
  const name = (req.query.name || "").trim();
  if (!name) {
    return res.send(renderPage("Welcome", `
      <h1>Welcome</h1>
      <p>Type your name to be greeted at <code>/welcome/:name</code>.</p>
      <form action="/welcome" method="get" style="display:flex;gap:.5rem;margin-top:.75rem">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          aria-label="name"
          required
          style="padding:.25rem .5rem;border:1px solid #ddd;border-radius:.5rem"
        />
        <button type="submit" style="padding:.25rem .6rem;border:1px solid #ddd;border-radius:.5rem;background:#f8f8f8">
          Go
        </button>
      </form>
    `));
  }
  res.redirect(`/welcome/${encodeURIComponent(name)}`);
});

// GET /welcome/:name → parameterised route
router.get("/welcome/:name", (req, res) => {
  const { name } = req.params;
  res.send(renderPage("Welcome", `
    <h1>Welcome, ${name}!</h1>
  `));
});

// GET /chain → two middleware functions with next()
function stepStart(req, _res, next) {
  req.t0 = Date.now();
  next();
}
function stepFinish(req, res) {
  const ms = Date.now() - (req.t0 ?? Date.now());
  res.send(renderPage("Chain", `
    <h1>Chained route</h1>
    <p>Two handlers executed; ~${ms} ms elapsed.</p>
  `));
}
router.get("/chain", stepStart, stepFinish);

// GET /file → serve a static html file via explicit route
router.get("/file", (_req, res) => {
  const filePath = path.join(__dirname, "..", "public", "a.html");
  res.sendFile(filePath);
});

// GET /a.html → explicitly serve the static file (no express.static required)
router.get("/a.html", (_req, res) => {
  const filePath = path.join(__dirname, "..", "public", "a.html");
  res.sendFile(filePath);
});

/* ---------- Export router ---------- */
module.exports = router;
