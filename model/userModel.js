const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userDataSchema = Schema({
  _id: Schema.Types.ObjectId,
  userName: {
    type: String,
    // to trim
    trim: true,
    //lowercase: true,
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
    type: {},
    required: [true, "you need to enter your age"],
    min: [
      18,
      "We can not validate your user. we don't accept pp that are below 18 years of age",
    ],
    max: 1000,
  },
  fbw: {
    type: {},
    required: true,
    enum: [
      "48",
      "We can not validate your user. They are not a member of FBW48",
    ],
  },
  email: {
    type: String,
    required: [true, "come on, write your mail"],
  },
  toolStack: {
    type: Array,
  },
  toolStackdescription: [
    { type: Schema.Types.ObjectId, ref: "toolStackDescription" },
  ],
});
const toolStackdescriptionSchema = Schema({
  toolStackdescription: {
    type: Schema.Types.ObjectId,
    ref: "toolStackDescription",
  },
  css: String,
  html: String,
  js: String,
});
const User = mongoose.model("people", userDataSchema, "people");
const Tool = mongoose.model("toolStackDescription", toolStackdescriptionSchema);
module.exports = { User, Tool };
