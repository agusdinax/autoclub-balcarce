import type { ReactNode } from "react";
import "./Badge.scss";

type BadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "danger";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span className={`badge badge--${variant}`}>
      <span className="badge__dot" />
      {children}
    </span>
  );
}