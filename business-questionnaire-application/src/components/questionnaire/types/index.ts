export type Answer = string | number | boolean;

export interface Question {
  id: number;
  text: string;
  type: "text" | "number" | "boolean";
  options?: string[];
  nextQuestion: (answer: Answer) => number | "END";
}

export interface QuestionnaireState {
  currentQuestionId: number;
  answers: Record<number, Answer>;
}
