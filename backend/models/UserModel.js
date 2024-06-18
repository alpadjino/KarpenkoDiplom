const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    min: 2,
    max: 15,
  },
  surname: {
    type: String,
    required: true,
    min: 2,
    max: 15,
  },
  password: {
    type: String,
    min: 7,
    required: true,
    select: false,
  },
  avatar: {
    type: String,
    default: "",
  },
  roles: [
    {
      type: String,
      default: [],
    },
  ],
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
      default: [],
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "news",
      default: [],
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userScheme);