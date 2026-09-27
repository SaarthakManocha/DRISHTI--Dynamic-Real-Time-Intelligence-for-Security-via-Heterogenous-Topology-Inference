import React from "react";
import type { Scenario } from "../types";
import { scenarioConfig } from "../data/scenarios";

interface TopbarProps {
  sectionLabel: string;
  sectionSubtitle: string;
  scenario: Scenario;
}

export default function Topbar({
  sectionLabel,
  sectionSubtitle,
  scenario,
}: TopbarProps) {
  const config = scenarioConfig[scenario];

  return (
    <header className="topbar">
      <div>
        <div className="topbar-label">
          DRISHTI / {sectionLabel.toUpperCase()}
        </div>

        <div className="topbar-subtitle">
          {sectionSubtitle}
        </div>
      </div>

      <div className="topbar-status">
        <span className="topbar-status-dot" />
        <span>ANALYSIS READY</span>
        <span className="topbar-separator">|</span>
        <span>{config.shortLabel}</span>
      </div>
    </header>
  );
}