import React from "react";
import type { Accent } from "../types";

interface MetricCardProps {
  label: string;
  value: string | number;
  description?: string;
  accent?: Accent;
  suffix?: string;
  eyebrow?: string;
}

export default function MetricCard({
  label,
  value,
  description,
  accent = "cyan",
  suffix,
  eyebrow,
}: MetricCardProps) {
  return (
    <div className={`metric-card metric-card-${accent}`}>
      <div className="metric-card-top">
        <span className="metric-card-label">
          {label}
        </span>

        {eyebrow && (
          <span className="metric-card-eyebrow">
            {eyebrow}
          </span>
        )}
      </div>

      <div className="metric-card-value">
        {value}
        {suffix && (
          <span className="metric-card-suffix">
            {suffix}
          </span>
        )}
      </div>

      {description && (
        <div className="metric-card-description">
          {description}
        </div>
      )}

      <div className="metric-card-accent" />
    </div>
  );
}