const {
  getAllUsers,
  getMe,
  findUserById,
  editUserData,
} = require("../controllers/UserController");

const router = require("express").Router();

router.get("/all", getAllUsers);
router.get("/me", getMe);
router.get("/findUser", findUserById);
router.post("/editProfile", editUserData);

module.exports = router;