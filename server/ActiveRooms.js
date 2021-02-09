const { Chess } = require('chess.js');

class ActiveRooms {

  constructor() {
    this.rooms = {}
  }

  joinRoom(id, socketID) {
    let color = null;

    if (id in this.rooms) {
      const room = this.rooms[id];
      room.count++;
      if (!room.players.b) {
        room.players.b = socketID;
        color = "black";
      }
    } else {
      this.rooms[id] = {
        count: 1,
        players: {
          w: socketID,
          b: null
        },
        game: new Chess()
      }
      color = "white";
    }

    return {
      fen: this.rooms[id].game.fen(),
      color
    }
  }

  makeMove(id, move) {
    this.rooms[id].game.move(move);
    return move;
  }

  leaveRoom(id) {
    this.rooms[id].count--;
    if (this.rooms[id].count <= 0) delete this.rooms[id];
  }
}

module.exports = ActiveRooms;