import { useLocation } from "react-router-dom";

function Score() {
  const location = useLocation();
  const { score, total } = location.state || {};

  return (
    <div>
      <h1>Résultat</h1>
      <p>Score : {score} / {total}</p>
    </div>
  );
}

export default Score;
