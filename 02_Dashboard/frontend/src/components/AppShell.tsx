import React from "react";
import type { Page, Scenario, Theme } from "../types";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

interface AppShellProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  scenario: Scenario;
  onScenarioChange: (scenario: Scenario) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
  children: React.ReactNode;
}

const pageMeta: Record<
  Page,
  {
    label: string;
    subtitle: string;
  }
> = {
  overview: {
    label: "Overview",
    subtitle: "Command center",
  },
  representation: {
    label: "Representation",
    subtitle: "Network state",
  },
  threat: {
    label: "Threat Assessment",
    subtitle: "Current risk",
  },
  dynamics: {
    label: "Temporal Dynamics",
    subtitle: "World model",
  },
  forecast: {
    label: "Forecast & Warning",
    subtitle: "Future onset",
  },
  intelligence: {
    label: "Attack Intelligence",
    subtitle: "Context & XAI",
  },
  replay: {
    label: "Ingestion Replay",
    subtitle: "Deterministic stream",
  },
  integrity: {
    label: "Research Integrity",
    subtitle: "Evidence boundaries",
  },
};

export default function AppShell({
  activePage,
  onPageChange,
  scenario,
  onScenarioChange,
  theme,
  onThemeChange,
  children,
}: AppShellProps) {
  const meta = pageMeta[activePage];

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onPageChange={onPageChange}
        scenario={scenario}
        onScenarioChange={onScenarioChange}
        theme={theme}
        onThemeChange={onThemeChange}
      />

      <div className="main-shell">
        <Topbar
          sectionLabel={meta.label}
          sectionSubtitle={meta.subtitle}
          scenario={scenario}
        />

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}
