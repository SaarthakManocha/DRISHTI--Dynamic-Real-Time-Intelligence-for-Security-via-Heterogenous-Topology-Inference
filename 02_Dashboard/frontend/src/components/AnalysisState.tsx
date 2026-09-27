import React, { useEffect, useState } from "react";

interface AnalysisStateProps {
  active?: boolean;
  duration?: number;
  readyLabel?: string;
}

type State = "initializing" | "computing" | "ready";

export default function AnalysisState({
  active = true,
  duration = 1400,
  readyLabel = "ANALYSIS READY",
}: AnalysisStateProps) {
  const [state, setState] = useState<State>(
    active ? "initializing" : "ready",
  );

  useEffect(() => {
    if (!active) {
      setState("ready");
      return;
    }

    setState("initializing");

    const computeTimer = window.setTimeout(() => {
      setState("computing");
    }, duration * 0.42);

    const readyTimer = window.setTimeout(() => {
      setState("ready");
    }, duration);

    return () => {
      window.clearTimeout(computeTimer);
      window.clearTimeout(readyTimer);
    };
  }, [active, duration]);

  const label =
    state === "initializing"
      ? "INITIALIZING ANALYSIS"
      : state === "computing"
        ? "COMPUTING SIGNALS"
        : readyLabel;

  return (
    <div
      className={`analysis-state analysis-state-${state}`}
      aria-live="polite"
    >
      <span className="analysis-state-indicator" />

      <span className="analysis-state-label">
        {label}
      </span>
    </div>
  );
}