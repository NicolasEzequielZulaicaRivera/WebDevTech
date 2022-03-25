const express = require("express");
const morgan = require("morgan");

// if (process.env.NODE_ENV !== "production")
require("dotenv").config();

const app = express();

// Settings
const port = process.env.PORT || 3000;
app.set("port", port);
app.set("json spaces", 2);

// Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); // Form data
app.use(express.json()); // Request / Response

// Routes
app.use("/api", require("./routes"));
app.use("/api/characters", require("./routes/characters"));

// Server
app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
