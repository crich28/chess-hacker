import './styles/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ChessGame from "./components/ChessGame";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id" component={ChessGame} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;