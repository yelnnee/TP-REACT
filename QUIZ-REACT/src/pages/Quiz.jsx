import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Appel API au chargement
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  // Si l'API n'a pas encore répondu
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
