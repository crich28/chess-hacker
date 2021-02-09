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

  useEffect(() => {
    socketRef.current = socketIOClient(URL, {
      query: { roomID: id }
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

  return (
    <div>
      <Chessboard width={400} position={fen} onDrop={handleMove} />
    </div>
  );
}
