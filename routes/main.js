// routes/main.js
// Purpose: All route handlers for the app live here (clean separation from index.js).
// Notes: Minimal, valid HTML responses are returned where appropriate.

const express = require("express");
const path = require("path");

const router = express.Router();

// Part B — basic routes
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/about", (req, res) => {
  // Basic but valid HTML
  res.send(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>About</title></head>
  <body><h1>This is the about page</h1><p>Express Lab 4 demo.</p></body>
</html>`);
});

router.get("/contact", (req, res) => {
  // Replace with real contact if required by your course policy
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

router.get("/date", (req, res) => {
  const now = new Date();

  const formatted = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
    timeZoneName: "short",
  }).format(now);

  res.send(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>Date</title></head>
  <body>
    <h1>Current server date/time</h1>
    <p>${formatted}</p>
  </body>
</html>`);
});

module.exports = router;
