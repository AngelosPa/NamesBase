const mongoose = require("mongoose");
const userDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    // to trim
    trim: true,
    // to make it required
    required: true,
    //unique: true
  },
  userPass: {
    type: String,

    required: true,
  },

  age: {
    type: Number,
    required: true,
  },
  fbw: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  toolStack: {
    type: Array,
    //   required: [
    //     true,
    //     "without a toolstack you shouldn't call yourself an fbw student ",
    //   ],
  },
});

module.exports = mongoose.model("people", userDataSchema, "people");

// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     max: 255,
//     min: 8,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     max: 255,
//     min: 8,
//   },
//   password: {
//     type: String,
//     required: true,
//     max: 1024,
//     min: 8,
//   },
// });

// const User = mongoose.model("people", userSchema, "people");

// module.exports = User;
