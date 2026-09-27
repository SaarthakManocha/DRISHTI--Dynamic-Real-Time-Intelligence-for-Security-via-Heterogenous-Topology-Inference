import React from "react";

type Status =
  | "promoted"
  | "supporting"
  | "experimental"
  | "not-validated"
  | "validated"
  | "demo"
  | "warning"
  | "normal";

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const defaultLabels: Record<Status, string> = {
  promoted: "PROMOTED",
  supporting: "SUPPORTING",
  experimental: "EXPERIMENTAL",
  "not-validated": "NOT VALIDATED",
  validated: "VALIDATED",
  demo: "DEMO",
  warning: "WARNING",
  normal: "NORMAL",
};

export default function StatusBadge({
  status,
  label,
}: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge-${status}`}>
      <span className="status-badge-dot" />
      {label ?? defaultLabels[status]}
    </span>
  );
}