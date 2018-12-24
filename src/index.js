const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");

// Database
const db = require("./config/database");

//Test db
db.authenticate()
  .then(() => console.log("database connected..."))
  .catch(err => console.log(err));

const app = express();

// Handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts")
  })
);
app.set("view engine", "handlebars");

// body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/", (req, res) => res.render("index"));

// Item routes
app.use("/items", require("./routes/items"));

const PORT = process.env.PORT || 3300;

app.listen(PORT, console.log(`Server started on port: ${PORT}`));
