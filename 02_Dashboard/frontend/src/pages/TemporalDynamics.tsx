import React from "react";
import PageHeader from "../components/PageHeader";
import AnalysisState from "../components/AnalysisState";
import { scenarioConfig } from "../data/scenarios";
import type { Scenario } from "../types";

interface TemporalDynamicsProps {
  scenario: Scenario;
}

// Illustrative scenario context for the interactive dashboard.
 // These values are demo visuals, not measured network observations.
const scenarioHistory: Record<
  Scenario,
  { time: string; state: string; intensity: number; accent: string }[]
> = {
  normal: [
    { time: "T−120s", state: "BASELINE", intensity: 16, accent: "cyan" },
    { time: "T−90s", state: "STABLE", intensity: 18, accent: "cyan" },
    { time: "T−60s", state: "STABLE", intensity: 15, accent: "cyan" },
    { time: "T−30s", state: "STEADY", intensity: 17, accent: "cyan" },
    { time: "NOW", state: "NORMAL", intensity: 14, accent: "cyan" },
  ],
  attack: [
    { time: "T−120s", state: "BASELINE", intensity: 24, accent: "cyan" },
    { time: "T−90s", state: "SHIFT", intensity: 37, accent: "cyan" },
    { time: "T−60s", state: "RISING", intensity: 52, accent: "violet" },
    { time: "T−30s", state: "ELEVATED", intensity: 71, accent: "violet" },
    { time: "NOW", state: "ACTIVE", intensity: 86, accent: "red" },
  ],
  novel: [
    { time: "T−120s", state: "BASELINE", intensity: 20, accent: "cyan" },
    { time: "T−90s", state: "SHIFT", intensity: 42, accent: "cyan" },
    { time: "T−60s", state: "IRREGULAR", intensity: 35, accent: "violet" },
    { time: "T−30s", state: "UNCERTAIN", intensity: 67, accent: "violet" },
    { time: "NOW", state: "REVIEW", intensity: 74, accent: "red" },
  ],
};

function TemporalDynamics({ scenario }: TemporalDynamicsProps) {
  const config = scenarioConfig[scenario];
  const historyStates = scenarioHistory[scenario];

  return (
    <div className="temporal-page">
      <PageHeader
        eyebrow="TEMPORAL DYNAMICS"
        title="Network State Evolution"
        description="Model how recent network states evolve through time and form a basis for future-state analysis."
      />

      <div className="temporal-analysis-row">
        <AnalysisState active duration={5600} readyLabel="DYNAMICS READY" />

        <div
          className={`temporal-scenario-badge temporal-scenario-${scenario}`}
        >
          <span />
          {config.shortLabel}
        </div>
      </div>

      <div className={`scenario-context-strip scenario-context-${scenario}`}>
        <div>
          <span className="scenario-context-kicker">CURRENT DEMO SCENARIO</span>
          <strong>{config.label}</strong>
        </div>
        <div className="scenario-context-metrics">
          <span>
            {scenario === "normal"
              ? "LOW RISK"
              : scenario === "attack"
                ? "HIGH RISK"
                : "REVIEW REQUIRED"}
          </span>
          <strong>{config.risk.toFixed(1)}% risk</strong>
        </div>
        <small>Illustrative Scenario View</small>
      </div>

      <section className="temporal-evolution-panel">
        <div className="temporal-panel-header">
          <div>
            <div className="temporal-panel-kicker">TEMPORAL STATE MODEL</div>

            <h2>History → Dynamics → Future</h2>

            <p>
              Recent network states provide temporal context for modeling how
              the system is evolving.
            </p>
          </div>

          <div className="temporal-history-badge">
            <span />5 MIN HISTORY
          </div>
        </div>

        <div className="temporal-stage">
          {/* =====================================================
              OBSERVED HISTORY
              ===================================================== */}

          <div className="temporal-history-column">
            <div className="temporal-section-heading">
              <span>OBSERVED NETWORK HISTORY</span>
              <small>10 × 30s WINDOWS</small>
            </div>

            <div className={`history-track history-track-${scenario}`}>
              <div className="history-track-line" />

              {historyStates.map((item, index) => (
                <div
                  key={item.time}
                  className={`history-node history-node-${item.accent}`}
                  style={{
                    animationDelay: `${index * 0.45}s`,
                  }}
                >
                  <div className="history-time">{item.time}</div>

                  <div className="history-orb">
                    <span />
                  </div>

                  <strong>{item.state}</strong>

                  <div className="history-signal">
                    <span
                      style={{
                        width: `${item.intensity}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="history-context-note">
              <span />
              Recent state provides temporal context
            </div>

            <div className="temporal-signal-summary">
              <div className="temporal-signal-summary-header">
                TEMPORAL SIGNAL INTERPRETATION
              </div>

              <p>
                Consecutive 30-second network states capture how activity
                evolves over recent history rather than relying on a single
                snapshot.
              </p>

              <div className="temporal-signal-flow">
                <span>5 MIN HISTORY</span>
                <b>→</b>
                <span>10 × 30s STATES</span>
                <b>→</b>
                <span>TEMPORAL DYNAMICS</span>
              </div>
            </div>
          </div>

          {/* =====================================================
              HISTORY → MODEL CONNECTOR
              ===================================================== */}

          <div className="temporal-connector temporal-connector-left">
            <div className="connector-line">
              <span className="connector-particle" />
              <span className="connector-particle connector-particle-two" />
            </div>

            <div className="connector-label">TEMPORAL INPUT</div>
          </div>

          {/* =====================================================
              WORLD MODEL
              ===================================================== */}

          <div className="temporal-model-column">
            <div className="temporal-model">
              <div className="model-orbit model-orbit-one" />
              <div className="model-orbit model-orbit-two" />
              <div className="model-orbit model-orbit-three" />

              <span className="model-particle model-particle-one" />
              <span className="model-particle model-particle-two" />
              <span className="model-particle model-particle-three" />

              <div className="model-core">
                <span className="model-kicker">WORLD MODEL</span>

                <strong>KOOPMAN</strong>

                <span className="model-subtitle">DYNAMICS</span>

                <small>
                  TEMPORAL STATE
                  <br />
                  TRANSFORMATION
                </small>
              </div>
            </div>

            <div className="model-caption">LEARNED TEMPORAL DYNAMICS</div>
          </div>

          {/* =====================================================
              MODEL → FUTURE CONNECTOR
              ===================================================== */}

          <div className="temporal-connector temporal-connector-right">
            <div className="connector-line">
              <span className="connector-particle" />
              <span className="connector-particle connector-particle-two" />
            </div>

            <div className="connector-label">STATE EVOLUTION</div>
          </div>

          {/* =====================================================
              MODELED FUTURE
              ===================================================== */}

          <div className="temporal-future-column">
            <div className="temporal-section-heading">
              <span>MODELED FUTURE</span>
              <small>STATE EVOLUTION</small>
            </div>

            <div className="future-card future-persistence">
              <div className="future-card-header">
                <div>
                  <strong>PERSISTENCE</strong>
                  <small>UNCHANGED STATE ASSUMPTION</small>
                </div>

                <span>BASELINE</span>
              </div>

              <div className="future-chart persistence-chart">
                <div className="chart-grid-line" />
                <div className="persistence-path" />
                <span className="current-state-dot" />
                <small>CURRENT STATE</small>
              </div>
            </div>

            <div className="future-card future-koopman">
              <div className="future-card-header">
                <div>
                  <strong>KOOPMAN DYNAMICS</strong>
                  <small>LEARNED TEMPORAL EVOLUTION</small>
                </div>

                <span>WORLD MODEL</span>
              </div>

              <div className="future-chart koopman-chart">
                <div className="chart-grid-line" />

                <svg
                  viewBox="0 0 420 90"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="koopman-path"
                    d="M0 68 C55 68 72 64 105 66 C145 69 175 65 205 57 C245 47 280 43 320 34 C355 27 390 20 420 12"
                  />
                </svg>

                <div className="future-horizons">
                  <span>30s</span>
                  <span>60s</span>
                  <span>150s</span>
                </div>
              </div>
            </div>

            <div className="world-model-result">
              <div className="world-result-number">
                <strong>20.67%</strong>
                <span>
                  LOWER MSE THAN
                  <br />
                  PERSISTENCE
                </span>
              </div>

              <p>
                The learned temporal representation captures useful
                network-state dynamics beyond simply assuming the current state
                will remain unchanged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          EVIDENCE
          ===================================================== */}

      <div className="temporal-evidence-grid">
        {/* WORLD MODEL EVIDENCE */}
        <div className="temporal-evidence-card">
          <div className="temporal-card-header">WORLD MODEL EVIDENCE</div>

          <div className="temporal-comparison">
            <div className="temporal-comparison-item">
              <span>PERSISTENCE MSE</span>
              <strong>1.573759</strong>
              <small>30s reference</small>
            </div>

            <div className="temporal-comparison-arrow">→</div>

            <div className="temporal-comparison-item">
              <span>KOOPMAN MSE</span>
              <strong>1.248418</strong>
              <small>30s learned dynamics</small>
            </div>
          </div>

          <div className="temporal-improvement">
            <strong>20.67%</strong>
            <span>LOWER 30s MSE</span>
          </div>

          <p>
            The learned temporal representation captures useful network-state
            dynamics beyond simply assuming the current state will remain
            unchanged.
          </p>
        </div>

        {/* WHY HISTORY MATTERS */}
        <div className="temporal-evidence-card">
          <div className="temporal-card-header">WHY HISTORY MATTERS</div>

          <div className="history-insight">
            <strong>0.712</strong>
            <span>GRU PR-AUC · 60s</span>
          </div>

          <div className="history-baseline">
            <div>
              <span>STATIC LR BASELINE</span>
              <strong>0.640</strong>
            </div>

            <div>
              <span>TEMPORAL GRU</span>
              <strong>0.712</strong>
            </div>
          </div>

          <p>
            At the 60-second horizon, temporal GRU forecasting outperformed the
            static baseline, supporting the value of recent history for this
            forecasting task.
          </p>
        </div>

        {/* MODEL BOUNDARY */}
        <div className="temporal-evidence-card">
          <div className="temporal-card-header">MODEL BOUNDARY</div>

          <div className="boundary-highlight">
            <strong>TEMPORAL ≠</strong>
            <span>ATTACK DETECTOR</span>
          </div>

          <div className="boundary-list">
            <div>
              <span className="boundary-dot" />
              <p>
                Koopman models temporal dynamics and network-state evolution.
              </p>
            </div>

            <div>
              <span className="boundary-dot" />
              <p>
                Detection and future-onset forecasting are separate analytical
                tasks.
              </p>
            </div>

            <div>
              <span className="boundary-dot" />
              <p>
                Longer-horizon recursive forecasts degraded beyond the validated
                operating range.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemporalDynamics;