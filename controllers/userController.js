const userData = require("../model/userModel");
const express = require("express");

const getAllUsers = async (req, res) => {
  try {
    const user = await userData.find();
    // 200 for Successful Ok

    res.status(200).json(
      user.map((oneUser) => {
        return {
          employeeId: oneUser._id,
          user: oneUser.userName,
          userPass: oneUser.userPass,
          age: oneUser.age,
          toolStack: oneUser.toolStack,
          email: oneUser.email,
          request: {
            type: "GET",
            url: `http://localhost:5000/users/${oneUser.userName}`,
          },
        };
      })
    );
  } catch (err) {
    // 500 Internal server error
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  getAllUsers,
};
