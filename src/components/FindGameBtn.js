import { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";

function makeID(len) {
  let result = "";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const URL = process.env.REACT_APP_URL;

export default function FindGameBtn() {
  const [findingGame, setFindingGame] = useState(false);
  const socketRef = useRef();
  const history = useHistory();

  useEffect(() => {
    socketRef.current = socketIOClient(URL);

    socketRef.current.on("found-match", (roomID) => {
      history.push(roomID);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const findGame = () => {
    socketRef.current.emit("join-queue", makeID(8));
    setFindingGame(true);
  };

  return (
    <div className="find-game">
      <Button
        variant="contained"
        color="primary"
        disabled={findingGame}
        onClick={findGame}
      >
        {!findingGame ? "Find Game" : "Searching..."}
      </Button>
    </div>
  );
}
