import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div className="section-header-copy">
        <h3 className="section-header-title">
          {title}
        </h3>

        {description && (
          <p className="section-header-description">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="section-header-action">
          {action}
        </div>
      )}
    </div>
  );
}