const express = require("express");
const router = express.Router();
const UserData = require("../model/userModel");
const {
  basicUserDataControll,
  getAllUsers,
  midForUser,
  addNewUser,
  updateOneUser,
  addNewDescription,
  updateUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers).post(addNewUser);
// FOR POST midForUser.checkUserDataAgain, midForUser.checkAge,
//
//
// PUT AKA Update one user upon criteria
//something to remember...
// PUT vs PATCH
// 	PATCH is used to update an existing entity with new information.
//     You can’t patch an entity that doesn’t exist.

//     PUT is used to set an entity’s information completely. PUTting is
//     similar to POSTing, except that it will overwrite the entity
//     if already exists or create it otherwise.
router
  .route("/:id")
  .get(midForUser.getOneUser)
  .patch(midForUser.getOneUser, updateOneUser)
  .put(updateUser)
  .post(addNewDescription);

module.exports = router;
