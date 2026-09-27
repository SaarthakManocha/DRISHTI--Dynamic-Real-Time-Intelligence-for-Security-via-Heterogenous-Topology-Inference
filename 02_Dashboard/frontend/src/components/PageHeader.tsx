import React from "react";
import AnalysisState from "./AnalysisState";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  readyLabel?: string;
  showAnalysisState?: boolean;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  readyLabel = "ANALYSIS READY",
  showAnalysisState = true,
}: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-header-copy">
        <div className="page-header-eyebrow">
          {eyebrow}
        </div>

        <h1 className="page-header-title">
          {title}
        </h1>

        <p className="page-header-description">
          {description}
        </p>
      </div>

      {showAnalysisState && (
        <div className="page-header-status">
          <AnalysisState readyLabel={readyLabel} />
        </div>
      )}
    </div>
  );
}