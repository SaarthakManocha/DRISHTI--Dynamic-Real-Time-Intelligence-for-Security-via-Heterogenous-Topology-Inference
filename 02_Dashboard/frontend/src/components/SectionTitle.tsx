import React from "react";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  rightContent?: React.ReactNode;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  rightContent,
}: SectionTitleProps) {
  return (
    <div className="section-title">
      <div className="section-title-main">
        {eyebrow && (
          <div className="section-title-eyebrow">
            {eyebrow}
          </div>
        )}

        <h2 className="section-title-heading">
          {title}
        </h2>

        {description && (
          <p className="section-title-description">
            {description}
          </p>
        )}
      </div>

      {rightContent && (
        <div className="section-title-actions">
          {rightContent}
        </div>
      )}
    </div>
  );
}