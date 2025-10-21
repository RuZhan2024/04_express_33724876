// routes/main.js
// Route module: keeps route logic separate from server bootstrap (index.js).
// Mounted at "/" in index.js. Minimal HTML where needed; no global side effects.

const express = require("express");
const path = require("path");

const router = express.Router();

/* ---------- Basic pages ---------- */

// GET /
router.get("/", (req, res) => {
  // Lightweight health/sanity endpoint (plain text is fine here).
  res.send("Hello World!");
});

// GET /about
router.get("/about", (req, res) => {
  // Valid, minimal HTML keeps browsers predictable and markers happy.
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>About</title></head>
<body><h1>This is the about page</h1><p>Express Lab 4 demo.</p></body>
</html>`);
});

// GET /contact
router.get("/contact", (req, res) => {
  // Replace with the details you want publicly visible on the VM.
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Contact</title></head>
<body>
  <h1>Contact</h1>
  <p>Student: Zhan Ru (ID: 33724876)</p>
  <p>Email: gru001@gold.ac.uk</p>
</body>
</html>`);
});

// GET /date
router.get("/date", (req, res) => {
  // Use Intl for reliable, locale-aware formatting (UK time on any host).
  const formatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Europe/London", timeZoneName: "short",
  }).format(new Date());

  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Date</title></head>
<body>
  <h1>Current server date/time</h1>
  <p>${formatted}</p>
</body>
</html>`);
});

/* ---------- Extension tasks (Part D) ---------- */

// GET /welcome/:name  → parameterised route demo
router.get("/welcome/:name", (req, res) => {
  const { name } = req.params; // params parsed by Express
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Welcome</title></head>
<body><h1>Welcome, ${name}!</h1></body>
</html>`);
});

// GET /chain  → two middleware functions chained with next()
function stepStart(req, _res, next) {
  req.t0 = Date.now(); // stash small, request-scoped data
  next();
}
function stepFinish(req, res) {
  const ms = Date.now() - (req.t0 ?? Date.now());
  res.send(`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Chain</title></head>
<body>
  <h1>Chained route</h1>
  <p>Two handlers executed; ~${ms} ms elapsed.</p>
</body>
</html>`);
}
router.get("/chain", stepStart, stepFinish);

// GET /file  → send a static file explicitly (also available as /a.html via express.static)
router.get("/file", (req, res) => {
  // Use path.join to avoid relative-path issues across platforms.
  const filePath = path.join(__dirname, "..", "public", "a.html");
  res.sendFile(filePath);
});

/* ---------- Export router ---------- */
// index.js does: const mainRoutes = require("./routes/main"); app.use("/", mainRoutes);
module.exports = router;
