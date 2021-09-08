const express = require("express");
const router = express.Router();
const app = express();
const morgan = require("morgan");
const path = require("path");
//  Development mode info
app.use(morgan("dev"));

// monogDB
const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(console.log("DB is connected 😎"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });
//
//
//      for the views
//
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

//
//
//

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
//A `GET` request endpoint at `/` as a landing page for your API.
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Welcome to my NamesBase app! I wish you have fun here ");
});
// http:localhost:5000/user
const user = require("./router/user");
app.use("/user", user);
const oneuser = require("./router/oneuser");
app.use("/display", oneuser);

module.exports = app;
