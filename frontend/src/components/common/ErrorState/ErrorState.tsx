import { FaTriangleExclamation } from "react-icons/fa6";
import { Button } from "../Button/Button";
import "./ErrorState.scss";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this information. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="error-state">
      <div className="error-state__icon">
        <FaTriangleExclamation />
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}