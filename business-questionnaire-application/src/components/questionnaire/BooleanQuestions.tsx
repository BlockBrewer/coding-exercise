import React from "react";
import { styles } from "./styles/QuestionCard.styles";

interface BooleanQuestionProps {
  options: string[];
  onAnswer: (answer: string) => void;
}

export const BooleanQuestion: React.FC<BooleanQuestionProps> = ({
  options,
  onAnswer,
}) => (
  <div style={styles.optionsContainer}>
    {options.map((option) => (
      <button
        key={option}
        style={styles.button}
        type="submit"
        onClick={() => onAnswer(option)}
      >
        {option}
      </button>
    ))}
  </div>
);
