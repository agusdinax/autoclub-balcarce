import "./Loading.scss";

interface LoadingProps {
  message?: string;
}

export function Loading({
  message = "Loading...",
}: LoadingProps) {
  return (
    <div
      className="loading"
      role="status"
      aria-live="polite"
    >
      <div className="loading__spinner" />

      <span className="loading__text">
        {message}
      </span>
    </div>
  );
}