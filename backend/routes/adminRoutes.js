const { createChat, addRoles } = require("../controllers/AdminController");
const { checkToken } = require("../middleware/checkToken");

const router = require("express").Router();

router.post("/chat/createChat", checkToken, createChat);
router.post("/chat/addRoles", addRoles);

module.exports = router;
