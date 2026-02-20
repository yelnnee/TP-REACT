import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../data/categories";
import { difficulties } from "../data/difficulties";

function Home() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz", {
      state: {
        category,
        difficulty,
      },
    });
  };

  return (
    <div>
      <h1>Quiz OpenTDB</h1>

      <label>Catégorie :</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">-- Choisir une catégorie --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label>Difficulté :</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="">-- Choisir une difficulté --</option>
        {difficulties.map((dif) => (
          <option key={dif.value} value={dif.value}>
            {dif.name}
          </option>
        ))}
      </select>

      <button disabled={!category || !difficulty} onClick={handleStart}>
        Démarrer
      </button>
    </div>
  );
}

export default Home;
