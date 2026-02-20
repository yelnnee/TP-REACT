import { useState } from "react";

const fakeQuestions = [
  {
    question: "Quelle est la capitale de la France ?",
    correct_answer: "Paris",
    incorrect_answers: ["Lyon", "Marseille", "Nice"],
  },
  {
    question: "Combien font 2 + 2 ?",
    correct_answer: "4",
    incorrect_answers: ["3", "5", "22"],
  },
];

function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  const current = fakeQuestions[index];

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

  if (index >= fakeQuestions.length) {
    return <div>Fin du quiz ! Score : {score} / {fakeQuestions.length}</div>;
  }

  return (
    <div>
      <h2>Question {index + 1} / {fakeQuestions.length}</h2>
      <p>{current.question}</p>

      {answers.map((ans) => (
        <button key={ans} onClick={() => handleAnswer(ans)}>
          {ans}
        </button>
      ))}
    </div>
  );
}

export default Quiz;
