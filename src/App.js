import './App.css';
import { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import ChessGame from "./components/ChessGame";

const URL = "http://localhost:5000";

function App() {

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(URL);

    return () => {
      socketRef.current.disconnect();
    }
  });

  return (
    <div className="App">
      Hello World
      <ChessGame />
    </div>
  );
}

export default App;