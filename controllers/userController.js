const { User, Tool } = require("../model/userModel");
const express = require("express");
//

//

//        ROUTE: USER/ AND USER/NAME SECTION
//
//
// to get all users from the database
let done = true;
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    console.log(user);
    return res.render("home", { user });
    //thats the same thing: but they have the same key and name so u can minimize it to user  res.render("home", { user:user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// cool way to organize our middleware inside an object for cleaner code

const midForUser = {};

//middleware to find only one user from the database
midForUser.getOneUser = async (req, res, next) => {
  let user;
  try {
    const user = await User.findOne({ userName: req.params.userName });
    console.log(user);
    res.user = user;
    res.status(200).json(user.userName);
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }

  next();
};
// middleware to check entries (for extra security apart from our schema ;)
midForUser.checkUserAgain = async (req, res, next) => {
  const { userName, userPass, age, fbw, email } = req.body;
  // you can do !userName or userName == null both are cool
  if (!userName || !userPass || age == null || fbw == null || email == null) {
    return res.status(400).json({
      message:
        "some of these are missing (userName, userPass, age, fbw, email )",
    });
  }
  next();
};
// Check Age
midForUser.checkAge = (req, res, next) => {
  const { age } = req.body;
  if (Number(age) < 18) {
    return res.status(400).json({
      message:
        "We can not validate your user. we don't accept pp that are below 18 years of age",
    });
  }
  next();
};
// Add new user
// Check FbW
midForUser.checkFbW = (req, res, next) => {
  const { fbw } = req.body;
  if (Number(age) != 48) {
    return res.status(400).json({
      message: "We can not validate your user. They are not a member of FBW48",
    });
  }
  next();
};
//
//
//
//            LETS ADD VALIDATORS !
//
//
//
// POST new toolStackdescription

// {
// 	"css":"gut",
// "html":"sehr gut",
// "js":"x"
// }

const addNewDescription = async (req, res) => {
  User.findById(req.params.id)
    .then((xuser) => {
      console.log(xuser.toolStackdescription);

      xuser.toolStackdescription.push({
        css: "gut",
        html: "sehr gut",
        js: "x",
      });
    })
    .then((xuser) => {
      // const tool = new Tool({
      //   _id: new mongoose.Types.ObjectId(),
      //   css: req.body.css,
      //   html: req.body.html,
      //   js: req.body.js,
      // });
      tool.save();
      xuser.toolStackdescription.push(tool);
      xuser.save();
      console.log(xuser);
      res.status(201).json(xuser);
    })

    .catch((err) => {
      res.status(400).json(err);
    });
};

const { body, validationResult } = require("express-validator");

const addNewUser = async (req, res) => {
  body("userName", "Please write valid username ").isLength({ min: 3, max: 9 }),
    body("fbw", "Please write valid email "),
    body("age", "Please write valid email "),
    body("email", "Please write valid email ").isEmail(),
    body("userPass", "Invalid password")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long")
      .matches(/\d/)
      .withMessage("must contain a number");
  const user = new User({
    userName: req.body.userName.toLowerCase(),
    userPass: req.body.userPass,
    fbw: req.body.fbw,
    age:
      Number(req.body.age) > 18
        ? req.body.age
        : res
            .status(400)
            .send(
              "We can not validate your user. we don't accept pp that are below 18 years of age"
            ),
    email: req.body.email,
    toolStack: req.body.toolStack,
    toolStackdescription: req.body.toolStackdescription,
  });
  try {
    // save
    const newUser = await user.save();
    // res.status(201).send(`This user is valid!User ${newUser.userName} added`);
    console.log(`This user is valid!User ${newUser.userName} added`);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.render("home", "error");
      //keep in mind to use return , it will save you ;)
      // https://poopcode.com/error-err_http_headers_sent-cannot-set-headers-after-they-are-sent-to-the-client-how-to-fix/
    } else {
      return res.render("welcome", { newUser });
    }
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({
      message: err.message,
    });
  }
};

const updateOneUser = async (req, res) => {
  const {
    userName,
    userPass,
    age,
    fbw,
    toolStack,
    email,
    toolStackdescription,
  } = req.body;
  if (userName) {
    res.user.userName = userName;
  }
  if (userPass) {
    res.user.userPass = userPass;
  }
  if (age) {
    res.user.age = age;
  }
  if (email) {
    res.user.email = email;
  }
  if (toolStack) {
    res.user.toolStack = [toolStack];
  }
  if (fbw) {
    res.user.fbw = fbw;
  }
  if (toolStackdescription) {
    res.user.toolStackdescription = toolStackdescription;
  }
  try {
    await res.user.save();
    console.log(`User anonymus changed to ${userName}`);
    // 200 for Successful OK
    //(avoid it, it might crash)
    // res.status(200).json({ message: "Employee updated" });
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  //this $set is used to update the fields and it belongs to mongoose
  try {
    await User.updateOne(
      { name: req.params.name },
      {
        $set: {
          userName: req.body.userName,
          userPass: req.body.userPass,
          age: req.body.age,
          fbw: req.body.fbw,
          email: req.body.email,
          toolStack: req.body.toolStack,
          toolStackdescription: req.body.toolStackdescription,
        },
      }
    );
    // 200 OK
    console.log("skata");
    res.status(200).json({ message: "user got updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//
//
//        ROUTE: DISPLAY/NAME SECTION
//
//
// middleware to find only one user from the database
const getOnedDisplayUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findOne({ userName: req.params.userName });

    //res.status(200).json(user.userName);
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
  //gia na to parei to epomeno middleware
  res.dataFromMiddleware1 = user;
  next();
};

//middleware for the  capitilization
const capitilization = async (req, res, next) => {
  try {
    user = res.dataFromMiddleware1;
    //console.log(user);
    user.userName =
      (user.userName + "").charAt(0).toUpperCase() + user.userName.slice(1);
    user.toolStack = user.toolStack.sort();
    user.age = user.age.toString();
    user.fbw = Number(user.fbw) * 1;
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.dataFromMiddleware2 = user;
  next();
};

// middleware for the alphabetical order

const alphabetical = async (req, res, next) => {
  user = res.dataFromMiddleware2;
  try {
    user.toolStack = user.toolStack.sort();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  //  req.dataFromMiddleware1
  res.dataFromMiddleware3 = user;
  next();
};

// middleware for the numberConversion

const numberConversion = async (req, res, next) => {
  user = res.dataFromMiddleware3;
  try {
    user.age = user.age.toString();
    user.fbw = Number(user.fbw) * 1.001;
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  //  req.dataFromMiddleware1
  res.dataFromMiddleware4 = user;

  next();
};

//to show this one user
const showonedisplayedUser = async (req, res) => {
  // 200 Successful Ok

  res.dataFromMiddleware4 = user;
  console.log(user);
  let name = user.userName;
  console.log(name);
  res.render("userview", { user });
  //res.status(200).json(user);
};
//

//END OF ROUTE DISPLAY SECTION
//
//
//
//

module.exports = {
  getAllUsers,
  addNewUser,
  updateOneUser,
  midForUser,
  updateUser,
  alphabetical,
  addNewDescription,
  getOnedDisplayUser,
  capitilization,
  showonedisplayedUser,
  numberConversion,
};
