import { io } from "socket.io-client";

const URL = "http://localhost:4444";

export const socket = io(URL);

socket.on("message", (message) => {
  console.log(message);
});
socket.emit("message", "Hello, my name is Client");