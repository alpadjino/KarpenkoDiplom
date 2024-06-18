const express = require("express");
const mongoose = require("mongoose");
const app = express();
const http = require("http");
const cookieParser = require('cookie-parser');

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const newsRoutes = require("./routes/newsRoutes");

const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["*"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["*"],
    allowedHeaders: ["*"],
  },
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => {
    console.log(err.message);
  });

io.on("connection", (socket) => {
  socket.on("userId", (userId) => {
    socket.id = userId;
  });
  
    socket.on("message", ({ msg, chatId, userId }) => {
      socket.id = userId;
      socket.join(chatId);
      io.emit(chatId, msg, userId);
      const usersOnline = io.sockets.adapter.rooms.get(chatId).size;
      console.log(usersOnline);
    });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});


server.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${process.env.PORT}`);
});