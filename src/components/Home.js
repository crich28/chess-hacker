import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home Page
      <Link to="/a"><button>Room A</button></Link>
      <Link to="/b"><button>Room B</button></Link>
      <Link to="/c"><button>Room C</button></Link>
    </div>
  );
}