const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");

const app = express();
// Require API routes
const log = require("./routes/log");

// Import API Routes
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(log);

// Export the server middleware
module.exports = {
  path: "/api",
  handler: app,
};
