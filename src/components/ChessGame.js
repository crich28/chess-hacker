import "../styles/ChessGame.css";
import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import Chessboard from "chessboardjsx";
import Chess from "chess.js";

const startingBoard =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const URL = process.env.REACT_APP_URL;

export default function ChessGame(props) {
  const { id } = props.match.params;

  const socketRef = useRef();

  const [chess] = useState(new Chess(startingBoard));

  const [fen, setFen] = useState(chess.fen());
  const [color, setColor] = useState(null);

  useEffect(() => {
    socketRef.current = socketIOClient(URL, {
      query: { roomID: id },
    });

    socketRef.current.on("get-settings", ({ fen, color }) => {
      chess.load(fen);
      setFen(chess.fen());
      setColor(color);
    });

    socketRef.current.on("update-board", (move) => {
      chess.move(move);
      setFen(chess.fen());
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [id]);

  const handleMove = (e) => {
    if (!color || chess.turn() !== color.charAt(0)) return;

    const move = {
      from: e.sourceSquare,
      to: e.targetSquare,
      promotion: "q",
    };

    const legalMove = chess.move(move);

    if (legalMove) {
      socketRef.current.emit("make-move", move);
      setFen(chess.fen());
    }
  };

  const turnMsg = () => {
    if (chess.game_over()) {
      return <div>Game Over!</div>;
    }

    if (chess.turn() === "b") {
      return <div>Black's Turn</div>;
    }

    if (chess.turn() === "w") {
      return <div>White's Turn</div>;
    }
  };

  return (
    <section className="chess-game">
      <h3>Room ID: {id}</h3>
      <Chessboard
        width={400}
        position={fen}
        onDrop={handleMove}
        orientation={color ? color : "white"}
      />
      {turnMsg()}
    </section>
  );
}
