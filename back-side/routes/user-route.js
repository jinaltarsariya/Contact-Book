var express = require("express");
const {
  postUserSignup,
  postUserLogin,
  updateUser,
  deleteUser,
  getUser,
  getUserList,
} = require("../controller/user-controller");
const { userToken } = require("../middleware/user-auth");
var router = express.Router();

router.post("/signup", postUserSignup);
router.post("/login", postUserLogin);
router.put("/update", userToken, updateUser);
router.delete("/delete", userToken, deleteUser);
router.get("/", getUser);
router.get("/list", getUserList);

module.exports = router;
