import './App.css';
import { useEffect } from "react";
import socketIOClient from "socket.io-client";
const URL = "http://localhost:5000";

function App() {

  useEffect(() => {
    const socket = socketIOClient(URL);
  });

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;