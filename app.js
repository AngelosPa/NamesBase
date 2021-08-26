const express = require("express");
const app = express();
const morgan = require("morgan");
//  Development mode info
app.use(morgan("dev"));
// to process the json data
app.use(express.json());

// monogDB
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("DB is connected 😎"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });

//A `GET` request endpoint at `/` as a landing page for your API.
app.get("/", (req, res) => {
  res.status(200).send("Welcome to our app");
});
// http:localhost:5000/user
const employees = require("./router/user");
app.use("/user", employees);
module.exports = app;
