import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <Link to="/">
        <button>Déconnexion</button>
      </Link>
    </div>
  );
}
