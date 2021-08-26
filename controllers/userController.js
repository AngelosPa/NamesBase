const userData = require("../model/userModel");
const express = require("express");
// to get all users from the database
const getAllUsers = async (req, res) => {
  try {
    const user = await userData.find();
    // 200 for Successful Ok

    res.status(200).json(
      user.map((oneUser) => {
        return {
          _id: oneUser._id,
          userName: oneUser.userName,
          userPass: oneUser.userPass,
          age: oneUser.age,
          toolStack: oneUser.toolStack,
          email: oneUser.email,
          fbw: oneUser.fbw,
        };
      })
    );
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
    user = await userData.findOne({ userName: req.params.userName });
    console.log(`Gmiesaiiiiiiiiiiiiiiiii ${user} GAmiesaiiiiiiiiiiiiiiiii`);
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
  const user = new userData({
    //IT DOESNT WORK STAY AWAY
    userName: req.body.userName,
    userPass: req.body.userPass,
    age: req.body.age,
    fbw: req.body.fbw,
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
module.exports = {
  getAllUsers,
  addNewUser,

  getOneUser,
};
