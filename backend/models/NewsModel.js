const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    text: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        default: [],
    }],
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
    comments: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment",
          default: [],
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("news", newsSchema);