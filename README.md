# 04_express_33724876

A very small Node.js web application. This is a simple personal demo built with **Express** that serves basic pages and demonstrates parameterised routes, chained middleware, and sending a static file. It shows how to organise routes with an Express `Router` and how to serve static assets safely. We will build on this structure in upcoming weeks.

---

## Technologies Used

* **HTML** — for a static sample page (`public/a.html`)
* **Node.js + Express** — to run a lightweight server (`index.js`, `routes/main.js`)
* **Built-in Node module**

  * `path` — to resolve file paths safely
* **Express features**

  * `express.Router()` — to organise routes
  * `express.static()` — to serve static files from `public/` (plus explicit `/a.html` & `/file` routes)

---

## How to Install and Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/RuZhan2024/04_express_33724876.git
cd 04_express_33724876
```

### 2. Install Node.js (if not already installed)

Download and install from [https://nodejs.org/](https://nodejs.org/)

### 3. Install dependencies and run the server

```bash
npm install
npm start
```

### 4. Open your browser

Visit: **[http://localhost:8000](http://localhost:8000)** — You should see “Hello World!”.

---

## Available Routes

* `/` — Hello World
* `/about` — simple HTML page
* `/contact` — sample contact details
* `/date` — localised server date/time (en-GB, Europe/London)
* `/welcome` — simply shows “Welcome, my friend!”
* `/welcome/:name` — parameterised greeting
* `/chain` — two handlers chained with `next()`; includes a **random 100–500 ms** simulated async delay
* `/file` — sends `public/a.html`
* `/a.html` — directly serves the same static file

---

## Project Structure

```
04_express_33724876/
├── index.js
├── package.json
├── routes/
│   └── main.js
├── public/
│   └── a.html
├── .gitignore
└── links.txt
```

---

## Deploying on the VM (summary)

```bash
# on the VM
git clone https://github.com/RuZhan2024/04_express_33724876.git
cd 04_express_33724876
npm install
# optionally set your assigned port: export PORT=8000
npm start
```

Keep it running:

```bash
sudo npm i -g forever
forever start -a -l forever.log -o out.log -e err.log index.js
```


| Route            | Description                                                           | URL                                                                                                       |
| ---------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`              | Hello World                                                           | [http://www.doc.gold.ac.uk/usr/122/](http://www.doc.gold.ac.uk/usr/122/)                                  |
| `/about`         | simple HTML page                                                      | [http://www.doc.gold.ac.uk/usr/122/about](http://www.doc.gold.ac.uk/usr/122/about)                        |
| `/contact`       | sample contact details                                                | [http://www.doc.gold.ac.uk/usr/122/contact](http://www.doc.gold.ac.uk/usr/122/contact)                    |
| `/date`          | localised server date/time (en-GB, Europe/London)                     | [http://www.doc.gold.ac.uk/usr/122/date](http://www.doc.gold.ac.uk/usr/122/date)                          |
| `/welcome`       | simply shows “Welcome, my friend!”                                    | [http://www.doc.gold.ac.uk/usr/122/welcome](http://www.doc.gold.ac.uk/usr/122/welcome)                    |
| `/welcome/:name` | parameterised greeting                                                | e.g. [http://www.doc.gold.ac.uk/usr/122/welcome/Ruzhan](http://www.doc.gold.ac.uk/usr/122/welcome/Ruzhan) |
| `/chain`         | two handlers chained with `next()`; random 100–500 ms simulated delay | [http://www.doc.gold.ac.uk/usr/122/chain](http://www.doc.gold.ac.uk/usr/122/chain)                        |
| `/file`          | sends `public/a.html`                                                 | [http://www.doc.gold.ac.uk/usr/122/file](http://www.doc.gold.ac.uk/usr/122/file)                          |
| `/a.html`        | directly serves the same static file                                  | [http://www.doc.gold.ac.uk/usr/122/a.html](http://www.doc.gold.ac.uk/usr/122/a.html)                      |
