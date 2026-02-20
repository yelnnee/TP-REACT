import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Protection si on arrive sur /quiz sans passer par Home
  if (!location.state) {
    navigate("/");
    return null;
  }

  const { category, difficulty } = location.state;

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.results || data.results.length === 0) {
          setError("Aucune question trouvée pour ces paramètres.");
          return;
        }
        setQuestions(data.results);
      })
      .catch(() => {
        setError("Erreur lors du chargement des questions.");
      });
  }, [category, difficulty]);

  // Affichage erreur API
  if (error) {
    return (
      <div className="container">
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  // Chargement API
  if (questions.length === 0) {
    return <div className="container">Chargement...</div>;
  }

  if (questions.length > 0 && index >= questions.length) {
    navigate("/score", {
      state: {
        score: score,
        total: questions.length,
      },
    });
    return null;
  }

  const current = questions[index];

  const answers = [
    current.correct_answer,
    ...current.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    if (answer === current.correct_answer) {
      setScore((prev) => prev + 1);
    }
    setIndex((prev) => prev + 1);
  };



  return (
    <div className="container">
      <h2>Question {index + 1} / {questions.length}</h2>

      <p dangerouslySetInnerHTML={{ __html: current.question }} />

      {answers.map((ans) => (
        <button
          key={ans}
          onClick={() => handleAnswer(ans)}
          dangerouslySetInnerHTML={{ __html: ans }}
        />
      ))}
    </div>
  );
}

export default Quiz;
