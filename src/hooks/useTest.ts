import { useState, useEffect } from "react";

interface Question {
  id: number;
  question: string;
}

interface AnswerOption {
  questionId: number;
  options: { id: string; text: string }[];
}

interface UserAnswer {
  questionId: number;
  answerId: string;
}

interface correctAnswer {
  questionId: number;
  correctAnswerId: string;
}

const useTest = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<AnswerOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [questionsData, answersData] = await Promise.all([
          fetch("/questions.json").then((res) => res.json()),
          fetch("/answers.json").then((res) => res.json()),
        ]);
        setQuestions(questionsData);
        setAnswers(answersData);
      } catch (err) {
        setError("Failed to load test data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const fetchAndCalculateScore = async (
    userAnswers: UserAnswer[]
  ): Promise<number> => {
    try {
      const res = await fetch("/correct-answers.json");
      const correctAnswers: correctAnswer[] = await res.json();
      const totalQuestions = correctAnswers.length;
      let correctCount = 0;

      const correctAnswersMap = new Map(
        correctAnswers.map((ca) => [ca.questionId, ca.correctAnswerId])
      );

      userAnswers.forEach((userAnswer) => {
        if (
          userAnswer.answerId === correctAnswersMap.get(userAnswer.questionId)
        ) {
          correctCount++;
        }
      });

      const score = (correctCount / totalQuestions) * 100;
      return score;
    } catch (err) {
      console.error("Failed to fetch or calculate score:", err);
      throw new Error("Failed to calculate score.");
    }
  };

  return { questions, answers, loading, error, fetchAndCalculateScore };
};

export default useTest;
