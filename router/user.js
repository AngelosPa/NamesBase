const express = require("express");
const router = express.Router();
const EmployeesData = require("../model/employeesModel");
const {
  basicUserDataControll,
  getAllUsers,
  getOneUser,
  getAdd,
  addNewUser,
  updateOneUser,
} = require("../controllers/userController");
router.route("/").get(getAllUsers).post(addNewUser);
