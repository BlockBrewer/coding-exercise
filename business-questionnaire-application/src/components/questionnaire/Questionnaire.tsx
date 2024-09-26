import { AnswerHistory } from "./AnswerHistory";
import { QuestionCard } from "./QuestionCard";
import ThankYou from "./ThankYou";
import { useQuestionnaire } from "./hooks/use-questionnaire";

export const Questionnaire: React.FC = () => {
  const { shownQuestion, handleAnswer, handleBack, currentQuestion } =
    useQuestionnaire();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "24rem",
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
      >
        {shownQuestion.currentQuestionId === -1 ? (
          <ThankYou answers={shownQuestion.answers} />
        ) : (
          <div style={{ padding: "1.5rem" }}>
            <h1
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            >
              Business Questionnaire
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
              Answer the following questions.
            </p>
            <AnswerHistory answers={shownQuestion.answers} />
            {Boolean(currentQuestion !== null) && (
              <QuestionCard
                question={currentQuestion}
                onAnswer={handleAnswer}
                onBack={handleBack}
                showBack={shownQuestion.currentQuestionId > 1}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
