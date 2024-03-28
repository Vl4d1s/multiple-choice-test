import "./Answers.css";

interface AnswersProps {
  options: {
    id: string;
    text: string;
  }[];
  onAnswerSelect: (answerId: string) => void;
}

const Answers = ({ options, onAnswerSelect }: AnswersProps) => (
  <div className="answers-container">
    {options.map((option) => (
      <label key={option.id} className="answer-option">
        <input
          type="radio"
          name="answer"
          value={option.id}
          onChange={() => onAnswerSelect(option.id)}
        />
        {option.text}
      </label>
    ))}
  </div>
);

export default Answers;
