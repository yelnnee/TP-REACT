import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav style={{
      padding: "10px 20px",
      background: "#eee",
      marginBottom: "20px",
      borderRadius: "6px",
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px"
    }}>
      <span>
        {location.pathname === "/" && "🏠 Accueil"}
        {location.pathname === "/quiz" && "📝 Quiz en cours"}
        {location.pathname === "/score" && "⭐ Résultat"}
      </span>

      <span>
        <Link to="/" style={{ textDecoration: "none", color: "#333" }}>
          Retour
        </Link>
      </span>
    </nav>
  );
}

export default Navbar;
