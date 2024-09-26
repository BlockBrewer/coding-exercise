// components/AnswerHistory.tsx
import React from "react";
import { Answer } from "./types";
import { questions } from "./data/questions";

interface AnswerHistoryProps {
  answers: Record<number, Answer>;
}

export const AnswerHistory: React.FC<AnswerHistoryProps> = ({ answers }) => {
  return (
    <div className="answer-history">
      <h3>Answer History</h3>
      <ul>
        {Object.entries(answers).map(([questionId, answer]) => {
          const question = questions.find((q) => q.id === Number(questionId));
          return (
            <li key={questionId}>
              {question?.text}: <strong>{String(answer)}</strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
