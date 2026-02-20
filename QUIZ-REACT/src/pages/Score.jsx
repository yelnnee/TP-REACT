import { useLocation, useNavigate } from "react-router-dom";

function Score() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, total } = location.state || {};

  
  if (score === undefined || total === undefined) {
    return (
      <div className="container">
        <h2>Aucun score disponible</h2>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Résultat</h1>
      <p>Score : {score} / {total}</p>

      <button onClick={() => navigate("/")}>Rejouer</button>
    </div>
  );
}

export default Score;
