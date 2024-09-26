// frontend/src/components/questionnaire/QuestionCard.tsx

import React, { useState } from "react";
import { Question, Answer } from "./types";
import { styles } from "./styles/QuestionCard.styles";
import { BooleanQuestion } from "./BooleanQuestions";
import { NumberQuestion } from "./NumberQuestions";
import { TextQuestion } from "./TextQuestions";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: Answer) => void;
  onBack: () => void;
  showBack: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  onBack,
  showBack,
}) => {
  const [answer, setAnswer] = useState<Answer>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnswer(answer);
    setAnswer("");
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.questionTitle}>{question.text}</h3>
      <form onSubmit={handleSubmit}>
        {question.type === "boolean" && (
          <BooleanQuestion
            options={question.options || []}
            onAnswer={onAnswer}
          />
        )}
        {question.type === "number" && (
          <NumberQuestion value={answer as number} onChange={setAnswer} />
        )}
        {question.type === "text" && (
          <TextQuestion value={answer as string} onChange={setAnswer} />
        )}
        <div style={styles.displayOnEnd}>
          {showBack && (
            <button
              style={{
                ...styles.submitButton,
                background: "transparent",
                color: "#000",
                marginRight: "0.5rem",
              }}
              onClick={onBack}
            >
              Back
            </button>
          )}
          {question.type !== "boolean" && (
            <button style={styles.submitButton} type="submit">
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
