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
  updateUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers).post(addNewUser);

router
  .route("/:userName")
  .get(getOneUser, showoneUser)
  .patch(getOneUser, updateOneUser)
  .put(getOneUser, updateUser);

module.exports = router;
