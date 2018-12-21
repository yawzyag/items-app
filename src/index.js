const express = require("express");

// Database
const db = require("./config/database");

//Test db
db.authenticate()
  .then(() => console.log("database connected..."))
  .catch(err => console.log(err));

const app = express();

// Index route
app.get("/", (req, res) => res.send("hello"));

// Item routes
app.use('/items', require('./routes/items'))

const PORT = process.env.PORT || 3300;

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
