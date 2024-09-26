import React from "react";
import { styles } from "./styles/QuestionCard.styles";

interface TextQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export const TextQuestion: React.FC<TextQuestionProps> = ({
  value,
  onChange,
}) => (
  <input
    style={styles.input}
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required
  />
);
