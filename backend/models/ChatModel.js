const mongoose = require("mongoose");

const chatScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      max: 20,
      required: true,
    },
    chatIcon: {
      type: String,
      default: "",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "message",
        default: [],
      },
    ],
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "news",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("chat", chatScheme);
