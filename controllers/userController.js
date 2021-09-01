const UserData = require("../model/userModel");
const express = require("express");
//

//

//        ROUTE: USER/ AND USER/NAME SECTION
//
//
// to get all users from the database
const getAllUsers = async (req, res) => {
  try {
    const user = await UserData.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// cool wat to organise our middleware inside an object for cleaner code

const midForUser = {};

//middleware to find only one user from the database
midForUser.getOneUser = async (req, res, next) => {
  try {
    const user = await UserData.findOne({ userName: req.params.userName });

    // res.status(200).json(user.userName);
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
  //gia na to parei to epomeno middleware
  res.user = user;
  next();
};
// middleware to check entries (for extra security apart from our schema ;)
midForUser.checkUserDataAgain = async (req, res, next) => {
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

const addNewUser = async (req, res) => {
  const user = new UserData({
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
  });
  try {
    // save
    const newUser = await user.save();
    res.status(201).send(`This user is valid!User ${newUser.userName} added`);
    console.log(`This user is valid!User ${newUser} added`);
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({
      message: err.message,
    });
  }
};

const updateOneUser = async (req, res) => {
  const { userName, userPass, age, fbw, toolStack, email } = req.body;
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
  try {
    await res.user.save();
    console.log(`User anonymus changed to ${userName}`);
    // 200 for Successful OK
    //res.status(200).json({ message: "Employee updated" });
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  //this $set is used to update the fields and it belongs to mongoose
  try {
    await UserData.updateOne(
      { name: req.params.name },
      {
        $set: {
          userName: req.body.userName,
          userPass: req.body.userPass,
          age: req.body.age,
          fbw: req.body.fbw,
          email: req.body.email,
          toolStack: req.body.toolStack,
        },
      }
    );
    // 200 OK
    res.status(200).json({ message: "user got updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//to show this one user
const showoneUser = async (req, res) => {
  // 200 Successful Ok
  res.status(200).json(res.user.userName);
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
    user = await UserData.findOne({ userName: req.params.userName });

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
    console.log(user);
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
  res.status(200).json(user);
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
  showoneUser,
  getOnedDisplayUser,
  capitilization,
  showonedisplayedUser,
  numberConversion,
};
