const {
  getAllChats,
  sendMessage,
  getCurrentChatMessages,
  getUserChats,
} = require("../controllers/ChatController");

const router = require("express").Router();

router.get("/all", getAllChats);
router.post("/sendMessage", sendMessage);
router.get("/getCurrentChatMessages", getCurrentChatMessages);
router.get("/getUserChats", getUserChats);

module.exports = router;