// Basic Library Imports
const express = require("express");
const router = require("./src/routes/api");
const app = new express();
const bodyParser = require("body-parser");

// Security Middleware Library Imports
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

// Database Library Import
const mongoose = require("mongoose");

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Body Parser Implement
app.use(bodyParser.json());

// Request Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

// MongoDB Connection
const URI = "mongodb://localhost:27017/Todo";
const OPTION = { user: "", pass: "" };
mongoose.connect(URI, OPTION, (err) => {
  console.log("Connection Success");
  console.log(err);
});

// Routing Implement
app.use("/api/v1/", router);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    data: "Not Found",
  });
});

module.exports = app;
