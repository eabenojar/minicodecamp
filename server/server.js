const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const morgan = require("morgan");
const router = require("./router");
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
  .catch(err => console.log(err));

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server is lisening on ${port}`));
