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
const gameQueue = [];

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  const { roomID } = socket.handshake.query;

  if (roomID) {
    socket.join(roomID);
    io.to(socket.id).emit("get-settings", rooms.joinRoom(roomID, socket.id));
  }

  socket.on("join-queue", (roomID) => {
    if (gameQueue.length > 0) {
      const p1 = gameQueue.shift();
      const p2 = socket.id;

      io.to(p1).emit("found-match", roomID);
      io.to(p2).emit("found-match", roomID);
    } else {
      gameQueue.push(socket.id)
    }
  });

  socket.on("make-move", (move) => {
    io.in(roomID).emit("update-board", rooms.makeMove(roomID, move));
  });

  socket.on("disconnect", () => {
    if (roomID) {
      socket.leave(roomID);
      rooms.leaveRoom(roomID);
    }
    const queueIdx = gameQueue.indexOf(socket.id);
    if (queueIdx !== -1) gameQueue.splice(queueIdx, 1);  
    console.log(`Client ${socket.id} disconnected`);
  });
});

module.exports = server;