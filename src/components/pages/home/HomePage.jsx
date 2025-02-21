import { Link, useParams } from "react-router-dom";

export default function HomePage() {
  // state
  const { username } = useParams();

  // comportement

  // render
  return (
    <div>
      <h1>Bonjour {username}</h1>
      <Link to="/">
        <button>Déconnexion</button>
      </Link>
    </div>
  );
}
