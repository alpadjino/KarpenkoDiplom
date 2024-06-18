const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        default: [],
      },
    ],
    avatar: {
      type: String,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        default: [],
      },
    ],
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "news",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", commentsSchema);
