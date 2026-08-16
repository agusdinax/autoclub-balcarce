import "./SectionTitle.scss";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={`section-title section-title--${align}`}>
      <span className="section-title__eyebrow">
        {eyebrow}
      </span>

      <h2 className="section-title__heading">
        {title}

        {highlight && (
          <span className="section-title__highlight">
            {highlight}
          </span>
        )}
      </h2>

      {description && (
        <p className="section-title__description">
          {description}
        </p>
      )}
    </div>
  );
}