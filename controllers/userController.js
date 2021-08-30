const UserData = require("../model/userModel");
const express = require("express");

// to get all users from the database
const getAllUsers = async (req, res) => {
  try {
    const user = await UserData.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//middleware for the alphabetical order and capitilization of the array
const alphabetical = async (req, res, next) => {
  let user;
  try {
    user = await UserData.findOne({ userName: req.params.userName });
    //let alpha = user.toolStack.sort();
    user.userName =
      (user.userName + "").charAt(0).toUpperCase() + user.userName.slice(1);
    user.toolStack.sort();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  next();
};
//to find only one user from the database
const getOneUser = async (req, res, next) => {
  let user;
  try {
    user = await UserData.findOne({ userName: req.params.userName });

    // res.status(200).json(user.userName);
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
  //gia na to parei to epomeno middleware
  res.user = user;
  next();
};
//to show this one user
const showoneUser = async (req, res) => {
  // 200 Successful Ok
  res.status(200).json(res.user.userName);
};

// Add new user

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

// PUT AKA Update one user upon criteria
//something to remember...
// PUT vs PATCH
// 	PATCH is used to update an existing entity with new information.
//     You can’t patch an entity that doesn’t exist.

//     PUT is used to set an entity’s information completely. PUTting is
//     similar to POSTing, except that it will overwrite the entity
//     if already exists or create it otherwise.
const updateUser = async (req, res) => {
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
module.exports = {
  getAllUsers,
  addNewUser,
  updateOneUser,
  getOneUser,
  updateUser,
  alphabetical,
  showoneUser,
};
