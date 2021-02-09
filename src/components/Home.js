import "../styles/Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import Chessboard from "chessboardjsx";

function makeID(len) {
  let result = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const startingBoard =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default function Home() {
  const [id, setID] = useState("");

  return (
    <section className="home">
      <h1>Play Chess</h1>
      <div className="start-game">
        <Button variant="contained" color="primary">
          <Link to={`/${makeID(8)}`}>Start New Game</Link>
        </Button>
      </div>
      <div className="join-game">
        <TextField
          onChange={(e) => setID(e.target.value)}
          variant="outlined"
          size="small"
          placeholder="Room ID"
        />
        <Button variant="contained" color="primary" style={{ marginLeft: 8 }}>
          <Link to={`/${id}`}>Join Game</Link>
        </Button>
      </div>
      <Chessboard width={400} position={startingBoard} />
    </section>
  );
}
