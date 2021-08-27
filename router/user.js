const express = require("express");
const router = express.Router();
const UserData = require("../model/userModel");
const {
  basicUserDataControll,
  getAllUsers,
  getOneUser,
  addNewUser,
  updateOneUser,
  showoneUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers).post(addNewUser);

router
  .route("/:userName")
  .get(getOneUser, showoneUser)
  .patch(getOneUser, updateOneUser);

module.exports = router;
