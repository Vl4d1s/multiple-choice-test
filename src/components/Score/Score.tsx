import "./Score.css";

interface ScoreProps {
  score: number;
}

const Score = ({ score }: ScoreProps) => {
  const getMessage = (score: number): string => {
    if (score >= 0 && score < 60) {
      return "Diligent failure 😭";
    } else if (score >= 60 && score < 70) {
      return "Failed 😔";
    } else if (score >= 70 && score < 80) {
      return "Good! 🙂";
    } else if (score >= 80 && score < 90) {
      return "Very good! 👍";
    } else if (score >= 90 && score <= 100) {
      return "Excellent! 🥇";
    } else {
      return "Invalid score";
    }
  };

  return (
    <div className="score-container">
      <p>Score: {score}</p>
      <p>Result: {getMessage(score)}</p>
    </div>
  );
};

export default Score;
