const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routes

module.exports = app;
