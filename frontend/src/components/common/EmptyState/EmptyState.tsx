import { FaFlagCheckered } from "react-icons/fa";
import "./EmptyState.scss";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <FaFlagCheckered />
      </div>

      <h3>{title}</h3>

      {description && (
        <p>{description}</p>
      )}
    </div>
  );
}