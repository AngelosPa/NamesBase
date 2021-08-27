const UserData = require("../model/userModel");
const express = require("express");
// to get all users from the database
const getAllUsers = async (req, res) => {
  try {
    const user = await UserData.find();
    // 200 for Successful Ok

    res.status(200).json(user);
    // user.map((oneUser) => {
    //   return {
    //     _id: oneUser._id,
    //     userName: oneUser.userName,
    //     userPass: oneUser.userPass,
    //     age: oneUser.age,
    //     toolStack: oneUser.toolStack,
    //     email: oneUser.email,
    //     fbw: oneUser.fbw,
    //   };
    //})
    //);
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
};
//to get one user from the database

// IT CONSOLE.LOG IT BUT POST MAN GIVE US NOT FOUND
const getOneUser = async (req, res, next) => {
  let user;
  try {
    user = await UserData.findOne({ userName: req.params._id });
    console.log(`Gmiesaiiiiiiiiiiiiiiiii ${user.userName} GAmiesaiii`);
    res.status(200).json(res.user);
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

// Add new user
//IT DOESNT WORK STAY AWAY//IT DOESNT WORK STAY AWAY
//IT DOESNT WORK STAY AWAY//IT DOESNT WORK STAY AWAY
const addNewUser = async (req, res) => {
  const user = new UserData({
    userName: req.body.userName,
    userPass: req.body.userPass,
    fbw: req.body.fbw,
    age: req.body.age,
    email: req.body.email,
    toolStack: req.body.toolStack,
  });
  try {
    // save

    const newUser = await user.save();

    // 201 for Successful Created

    res.status(201).json(newUser);
    console.log(`User ${newUser} added`);
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({
      message: err.message,
    });
  }
};
//IT DOESNT WORK STAY AWAY//IT DOESNT WORK STAY AWAY
//IT DOESNT WORK STAY AWAY//IT DOESNT WORK STAY AWAY

//update one user
//IT DOESNT WORK STAY AWAY//IT DOESNT WORK STAY AWAY
//IT DOESNT WORK STAY AWAY//IT DOESNT WORK STAY AWAY
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
    console.log(`User ${res.user.userName} changed to ${userName}`);
    // 200 for Successful OK
    //res.status(200).json({ message: "Employee updated" });
  } catch (err) {
    // 400 for Bad request
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  getAllUsers,
  addNewUser,
  updateOneUser,
  getOneUser,
};
