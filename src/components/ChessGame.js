import { useState } from "react";
import Chessboard from "chessboardjsx";
import Chess from "chess.js";

const startingBoard = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export default function ChessGame() {

  const [chess] = useState(new Chess(startingBoard));

  const [fen, setFen] = useState(chess.fen());

  const handleMove = (move) => {
    const legalMove = chess.move({
      from: move.sourceSquare,
      to: move.targetSquare,
      promotion: "q"
    });

    if (legalMove) setFen(chess.fen());
  }

  return (
    <div>
      <Chessboard 
        width={400}
        position={fen}
        onDrop={handleMove}
      />
    </div>
  );
}