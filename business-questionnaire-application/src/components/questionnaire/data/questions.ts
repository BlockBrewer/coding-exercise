import { Question } from "../types";

export const questions: Question[] = [
  {
    id: 1,
    text: "Does your business operate in CA?",
    type: "boolean",
    options: ["Yes", "No"],
    nextQuestion: (answer) => (answer === "Yes" ? 2 : "END"),
  },
  {
    id: 2,
    text: "How many employees do you have?",
    type: "number",
    nextQuestion: (answer) => ((answer as number) > 100 ? "END" : 3),
  },
  {
    id: 3,
    text: "Do you serve food?",
    type: "boolean",
    options: ["Yes", "No"],
    nextQuestion: (answer) => (answer === "Yes" ? 4 : 6),
  },
  {
    id: 4,
    text: "Do you serve hot food?",
    type: "boolean",
    options: ["Yes", "No"],
    nextQuestion: () => 5,
  },
  {
    id: 5,
    text: "Are you open past midnight?",
    type: "boolean",
    options: ["Yes", "No"],
    nextQuestion: () => "END",
  },
  {
    id: 6,
    text: "Do you host live music?",
    type: "boolean",
    options: ["Yes", "No"],
    nextQuestion: () => "END",
  },
];
