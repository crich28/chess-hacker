const { Chess } = require('chess.js');

class ActiveRooms {

  constructor() {
    this.rooms = {}
  }

  joinRoom(id) {
    if (id in this.rooms) {
      this.rooms[id].count++;
    } else {
      this.rooms[id] = {
        count: 1,
        game: new Chess()
      }
    }

    return this.rooms[id].game.fen();
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