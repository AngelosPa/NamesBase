const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    // to trim
    trim: true,
    // to make it required
    required: [true, "userName is must"],
    // unique: true,
  },
  userPass: {
    type: String,
    //required: true,
    required: [true, "you need a password"],
  },
  // short way
  age: {
    type: Number,
    required: [true, "you need to enter your age"],
  },
  fbw: {
    type: Number,
    required: [true, "you need to tell us your classnumber"],
  },
  email: {
    type: string,
    required: [true, "come on write your mail"],
  },
});

module.exports = mongoose.model("people", employeesDataSchema, "people");
