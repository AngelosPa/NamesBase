const express = require("express");
const router = express.Router();
const UserData = require("../model/userModel");
const {
  basicUserDataControll,
  getAllUsers,
  getOneUser,
  getAdd,
  addNewUser,
  updateOneUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers);
// .post(addNewUser);
module.exports = router;
