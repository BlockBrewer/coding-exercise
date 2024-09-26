import { useState } from "react";
import { Answer, QuestionnaireState } from "../types";
import { questions } from "../data/questions";

export const useQuestionnaire = () => {
  const [shownQuestion, setShownQuestion] = useState<QuestionnaireState>({
    currentQuestionId: 1,
    answers: {},
  });

  const handleAnswer = (answer: Answer) => {
    const currentQuestion = questions.find(
      (q) => q.id === shownQuestion.currentQuestionId
    );
    if (!currentQuestion) return;

    const nextQuestionId = currentQuestion.nextQuestion(answer);

    setShownQuestion((prevState) => ({
      ...prevState,
      currentQuestionId: nextQuestionId === "END" ? -1 : nextQuestionId,
      answers: { ...prevState.answers, [currentQuestion.id]: answer },
    }));
  };

  const handleBack = () => {
    const previousQuestionId = Math.max(1, shownQuestion.currentQuestionId - 1);
    setShownQuestion((prevState) => ({
      ...prevState,
      currentQuestionId: previousQuestionId,
    }));
  };

  const currentQuestion = questions.find(
    (q) => q.id === shownQuestion.currentQuestionId
  );

  return {
    shownQuestion,
    handleAnswer,
    handleBack,
    currentQuestion,
  };
};
