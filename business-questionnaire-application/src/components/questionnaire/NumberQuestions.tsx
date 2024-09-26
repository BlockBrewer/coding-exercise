import React from "react";
import { styles } from "./styles/QuestionCard.styles";

interface NumberQuestionProps {
  value: number;
  onChange: (value: number) => void;
}

export const NumberQuestion: React.FC<NumberQuestionProps> = ({
  value,
  onChange,
}) => (
  <input
    style={styles.input}
    type="number"
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    required
  />
);
