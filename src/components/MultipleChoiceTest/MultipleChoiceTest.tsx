import React, { useState } from "react";

import Score from "../Score/Score";
import Answers from "../Answers/Answers";
import useTest from "../../hooks/useTest";
import Question from "../Question/Question";
import ControlButton from "../ControlButton/ControlButton";

type UserAnswer = {
  questionId: number;
  answerId: string;
};

const Test = () => {
  const { questions, answers, fetchAndCalculateScore, loading, error } =
    useTest();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [testFinished, setTestFinished] = useState(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const isOptionSelected = !!userAnswers[currentQuestionIndex];

  const handleAnswerSelect = (answerId: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      answerId,
    };
    setUserAnswers(newAnswers);
  };

  const handleFinishTest = async () => {
    const score = await fetchAndCalculateScore(userAnswers);
    setFinalScore(score);
    setTestFinished(true);
  };

  const handleNextOrFinish = () => {
    if (currentQuestionIndex === questions.length - 1) {
      handleFinishTest();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (testFinished) return <Score score={finalScore} />;

  return (
    <React.Fragment>
      <Question text={questions[currentQuestionIndex].question} />
      <Answers
        options={answers[currentQuestionIndex].options}
        onAnswerSelect={handleAnswerSelect}
      />
      <ControlButton
        onClick={handleNextOrFinish}
        isLastQuestion={currentQuestionIndex === questions.length - 1}
        isOptionSelected={isOptionSelected}
      />
    </React.Fragment>
  );
};

export default Test;
