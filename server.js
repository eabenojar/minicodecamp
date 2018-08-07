const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const http = require("http");
const morgan = require("morgan");
const router = require("./router");
const path = require("path");
require("dotenv").config();

// Create express app
const app = express();

// Middleware
app.use(morgan("combined"));
app.use(bodyParser.json());
router(app);

// DB config
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log("MONGO IS CONNECTED"))
  .catch(err => console.log('MONGO CAN"T CONNECT'));

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
app.listen(port, () => console.log(`Server is lisening on ${port}`));
