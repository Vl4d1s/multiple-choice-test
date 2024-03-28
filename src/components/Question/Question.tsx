import "./Question.css";

interface QuestionProps {
  text: string;
}

const Question = ({ text }: QuestionProps) => {
  return (
    <div className="question-container">
      <div className="question-text">{text}</div>
    </div>
  );
};

export default Question;
