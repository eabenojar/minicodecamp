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

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // app.use(express.static("client/build"));
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Server Setup
const port = process.env.PORT || 5000;
// const server = http.createServer(app);
app.listen(port, () => console.log(`Server is lisening on ${port}`));
