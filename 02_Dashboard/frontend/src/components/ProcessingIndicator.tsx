import React from "react";

interface ProcessingIndicatorProps {
  processing: boolean;
  label?: string;
}

export default function ProcessingIndicator({
  processing,
  label = "ANALYSIS ENGINE",
}: ProcessingIndicatorProps) {
  return (
    <div
      className={`processing-indicator ${
        processing ? "is-processing" : "is-complete"
      }`}
    >
      <span className="processing-indicator-dot" />

      <span>
        {processing
          ? `${label} PROCESSING`
          : `${label} COMPLETE`}
      </span>

      {processing && (
        <span className="processing-indicator-loader">
          <i />
          <i />
          <i />
        </span>
      )}
    </div>
  );
}