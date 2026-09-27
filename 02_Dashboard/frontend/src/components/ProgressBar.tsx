import React from "react";
import type { Accent } from "../types";

interface ProgressBarProps {
  value: number;
  max?: number;
  accent?: Accent;
  label?: string;
  showValue?: boolean;
  height?: "small" | "medium";
}

export default function ProgressBar({
  value,
  max = 100,
  accent = "cyan",
  label,
  showValue = true,
  height = "medium",
}: ProgressBarProps) {
  const percentage = Math.min(
    100,
    Math.max(0, (value / max) * 100),
  );

  return (
    <div className="progress-wrapper">
      {(label || showValue) && (
        <div className="progress-header">
          {label && (
            <span className="progress-label">
              {label}
            </span>
          )}

          {showValue && (
            <span className="progress-value">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`progress-track progress-track-${height}`}
      >
        <div
          className={`progress-fill progress-fill-${accent}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}