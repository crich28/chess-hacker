const path = require("path");
const ActiveRooms = require("./ActiveRooms");

const express = require("express");
const app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

const rooms = new ActiveRooms();

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  const { roomID } = socket.handshake.query;

  socket.join(roomID);
  io.to(socket.id).emit("get-fen", rooms.joinRoom(roomID));

  socket.on("make-move", (move) => {
    io.in(roomID).emit("update-board", rooms.makeMove(roomID, move));
  });

  socket.on("disconnect", () => {
    socket.leave(roomID);
    rooms.leaveRoom(roomID);
    console.log(`Client ${socket.id} disconnected`);
  });
});

module.exports = server;