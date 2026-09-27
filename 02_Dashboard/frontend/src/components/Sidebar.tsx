import React from "react";
import type { Page, Scenario, Theme } from "../types";
import { scenarioOptions } from "../data/scenarios";
import drishtiLogo from "../assets/drishti-logo.png";

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  scenario: Scenario;
  onScenarioChange: (scenario: Scenario) => void;
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

interface NavigationItem {
  id: Page;
  label: string;
  subtitle: string;
  icon: string;
}

const navigation: NavigationItem[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Command center",
    icon: "◉",
  },
  {
    id: "representation",
    label: "Representation",
    subtitle: "Network state",
    icon: "◇",
  },
  {
    id: "threat",
    label: "Threat Assessment",
    subtitle: "Current risk",
    icon: "△",
  },
  {
    id: "dynamics",
    label: "Temporal Dynamics",
    subtitle: "World model",
    icon: "≋",
  },
  {
    id: "forecast",
    label: "Forecast & Warning",
    subtitle: "Future onset",
    icon: "↗",
  },
  {
    id: "intelligence",
    label: "Attack Intelligence",
    subtitle: "Context & XAI",
    icon: "⌘",
  },
  {
    id: "replay",
    label: "Ingestion Replay",
    subtitle: "Deterministic stream",
    icon: "⌁",
  },
];

export default function Sidebar({
  activePage,
  onPageChange,
  scenario,
  onScenarioChange,
  theme,
  onThemeChange,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">
          <img className="brand-logo" src={drishtiLogo} alt="DRISHTI logo" />
        </div>

        <div className="brand-copy">
          <div className="brand-name">DRISHTI</div>
          <div className="brand-subtitle">
            NETWORK INTELLIGENCE
            <br />
            COMMAND CONSOLE
          </div>
        </div>
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-label">WORKSPACE</div>

        <nav className="navigation">
          {navigation.map((item) => {
            const active = activePage === item.id;

            return (
              <button
                key={item.id}
                type="button"
                className={`nav-item ${active ? "active" : ""}`}
                onClick={() => onPageChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>

                <span className="nav-copy">
                  <span className="nav-title">{item.label}</span>
                  <span className="nav-subtitle">{item.subtitle}</span>
                </span>

                {active && <span className="nav-arrow">›</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-section sidebar-system">
        <div className="sidebar-label">SYSTEM</div>

        <button
          type="button"
          className={`nav-item ${activePage === "integrity" ? "active" : ""}`}
          onClick={() => onPageChange("integrity")}
        >
          <span className="nav-icon">◇</span>

          <span className="nav-copy">
            <span className="nav-title">Research Integrity</span>
            <span className="nav-subtitle">Evidence boundaries</span>
          </span>

          {activePage === "integrity" && <span className="nav-arrow">›</span>}
        </button>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-label">SCENARIO</div>

        <select
          className="scenario-select"
          value={scenario}
          onChange={(event) => onScenarioChange(event.target.value as Scenario)}
        >
          {scenarioOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="system-status">
          <div className="status-line">
            <span className="status-dot" />
            <span>Frozen Research</span>
          </div>

          <div className="status-line">
            <span className="status-dot" />
            <span>Deterministic Demo</span>
          </div>
        </div>

        <div className="sidebar-label appearance-label">APPEARANCE</div>

        <div className="theme-switch">
          <button
            type="button"
            className={theme === "dark" ? "selected" : ""}
            onClick={() => onThemeChange("dark")}
          >
            Dark
          </button>

          <button
            type="button"
            className={theme === "light" ? "selected" : ""}
            onClick={() => onThemeChange("light")}
          >
            Light
          </button>
        </div>
      </div>
    </aside>
  );
}
