// Set up express
const express = require("express");
const app = express();
const port = 8000; 

// Handle the routes
app.get("/", (req, res) => res.send("Hello World!")); 

// Start listening for HTTP requests
app.listen(port, 
    () => console.log(`Node server is running on port ${port}...`)); 
