import "./ControlButton.css";

interface ControlButtonProps {
  onClick: () => void;
  isLastQuestion: boolean;
  isOptionSelected: boolean;
}
const ControlButton = ({
  onClick,
  isLastQuestion,
  isOptionSelected,
}: ControlButtonProps) => (
  <button
    className="control-button"
    onClick={onClick}
    disabled={!isOptionSelected}
  >
    {isLastQuestion ? "Finish" : "Next"}
  </button>
);

export default ControlButton;
