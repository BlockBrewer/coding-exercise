import React from "react";
import { Answer } from "./types";
import { questions } from "./data/questions";
import { styles } from "./styles/QuestionCard.styles";

interface ThankYouProps {
  answers: Record<number, Answer>;
}

const ThankYou: React.FC<ThankYouProps> = ({ answers }) => {
  return (
    <div style={styles.container}>
      <h2>Thank You!</h2>
      <p>Here's a summary of your answers:</p>
      <ul>
        {Object.entries(answers).map(([questionId, answer]) => {
          const question = questions.find((q) => q.id === Number(questionId));
          return (
            <li key={questionId}>
              <strong>{question?.text}</strong>: {String(answer)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ThankYou;
