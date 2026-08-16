import type { HTMLAttributes, ReactNode } from "react";
import "./Card.scss";

type CardVariant = "default" | "elevated" | "outlined";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  hoverable?: boolean;
}

export function Card({
  children,
  variant = "default",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const classes = [
    "card",
    `card--${variant}`,
    hoverable ? "card--hoverable" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={classes} {...props}>
      <div className="card__accent" />

      {children}
    </article>
  );
}