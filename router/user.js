const express = require("express");
const router = express.Router();
const UserData = require("../model/userModel");
const {
  basicUserDataControll,
  getAllUsers,
  getOneUser,

  addNewUser,
  updateOneUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers).post(addNewUser);

router.route("/:userName").get(getOneUser).patch(getOneUser, updateOneUser);

module.exports = router;
