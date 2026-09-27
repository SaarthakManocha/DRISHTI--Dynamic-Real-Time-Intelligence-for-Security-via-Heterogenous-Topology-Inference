import React, { useEffect, useState } from "react";
import AppShell from "./components/AppShell";
import Overview from "./pages/Overview";
import Representation from "./pages/Representation";
import ThreatAssessment from "./pages/ThreatAssessment";
import TemporalDynamics from "./pages/TemporalDynamics";
import ForecastWarning from "./pages/ForecastWarning";
import AttackIntelligence from "./pages/AttackIntelligence";
import IngestionReplay from "./pages/IngestionReplay";
import ResearchIntegrity from "./pages/ResearchIntegrity";
import Landing from "./landing/Landing";
import type { Page, Scenario, Theme } from "./types";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const [activePage, setActivePage] = useState<Page>("overview");

  const [scenario, setScenario] = useState<Scenario>("attack");

  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  if (!showDashboard) {
    return <Landing onLaunch={() => setShowDashboard(true)} />;
  }

  return (
    <AppShell
      activePage={activePage}
      onPageChange={setActivePage}
      scenario={scenario}
      onScenarioChange={setScenario}
      theme={theme}
      onThemeChange={setTheme}
    >
      {activePage === "overview" && <Overview scenario={scenario} />}

      {activePage === "representation" && (
        <Representation scenario={scenario} />
      )}

      {activePage === "threat" && <ThreatAssessment scenario={scenario} />}

      {activePage === "dynamics" && <TemporalDynamics scenario={scenario} />}

      {activePage === "forecast" && <ForecastWarning scenario={scenario} />}

      {activePage === "intelligence" && (
        <AttackIntelligence scenario={scenario} />
      )}

      {activePage === "replay" && <IngestionReplay scenario={scenario} />}

      {activePage === "integrity" && <ResearchIntegrity />}

      {activePage !== "overview" &&
        activePage !== "representation" &&
        activePage !== "threat" &&
        activePage !== "dynamics" &&
        activePage !== "forecast" &&
        activePage !== "intelligence" &&
        activePage !== "replay" &&
        activePage !== "integrity" && (
          <div className="page-placeholder">
            <div className="placeholder-eyebrow">DRISHTI</div>

            <h1>Module ready for integration</h1>

            <p>
              This intelligence module will be mounted here after the command
              center is validated.
            </p>

            <div className="placeholder-state">
              <span className="status-dot" />
              <span>Intelligence interface initialized</span>
            </div>
          </div>
        )}
    </AppShell>
  );
}

export default App;
