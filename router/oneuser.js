const express = require("express");
const router = express.Router();

const { alphabetical } = require("../controllers/userController");
router.route("/").get(async (req, res) => {
  // 200 Successful Ok
  res
    .status(200)
    .send(
      "welcome to endpoint display/ please write a user name after the slash "
    );
});

router.route("/:userName").get(alphabetical);

module.exports = router;
