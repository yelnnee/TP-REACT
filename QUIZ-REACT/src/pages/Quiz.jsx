import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { category, difficulty } = location.state;

  useEffect(() => {
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((res) => res.json())
      .then((data) => {
        // Cas 1 : API renvoie 0 questions
        if (data.results.length === 0) {
          setError("Aucune question trouvée pour ces paramètres.");
          return;
        }

        setQuestions(data.results);
      })
      .catch(() => {
        // Cas 2 : API plante
        setError("Erreur lors du chargement des questions.");
      });
  }, [category, difficulty]);

  // Cas 3 : erreur → afficher message + bouton retour
  if (error) {
    return (
      <div>
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  // Cas 4 : API pas encore chargée
  if (questions.length === 0) {
    return <div>Chargement...</div>;
  }

  const current = questions[index];

  const answers = [
    current.correct_answer,
    ...current.incorrect_answers,
  ].sort(() => Math.random() - 0.5);

  const handleAnswer = (answer) => {
    if (answer === current.correct_answer) {
      setScore(score + 1);
    }
    setIndex(index + 1);
  };

  // Cas 5 fin du quiz → Score
  if (index >= questions.length) {
    navigate("/score", {
      state: {
        score: score,
        total: questions.length,
      },
    });
    return null;
  }

  return (
    <div>
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
