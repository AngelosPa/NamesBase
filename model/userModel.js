const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    // to trim
    trim: true,
    // to make it required
    required: [
      true,
      " We can not validate your user. They are not a member of FBW48",
    ],
    unique: true,
  },
  userPass: {
    type: String,
    required: [true, "you need a password"],
    max: 25,
    min: 8,
  },

  age: {
    type: Number,
    required: [true, "you need to enter your age"],
    min: [
      18,
      "We can not validate your user. we don't accept pp that are below 18 years of age",
    ],
    max: 1000,
  },
  fbw: {
    type: Number,
    required: true,
    enum: [
      [48],
      "We can not validate your user. They are not a member of FBW48",
    ],
  },
  email: {
    type: String,
    equired: [true, "come on, write your mail"],
  },
  toolStack: {
    type: Array,
  },
});

module.exports = mongoose.model("people", userDataSchema, "people");
