import React from "react";
import PageHeader from "../components/PageHeader";
import AnalysisState from "../components/AnalysisState";
import { frozenResults } from "../data/results";
import { scenarioConfig } from "../data/scenarios";
import type { Scenario } from "../types";

interface ForecastWarningProps {
  scenario: Scenario;
}

function ForecastWarning({ scenario }: ForecastWarningProps) {
  const config = scenarioConfig[scenario];
  const forecast = frozenResults.forecast;
  const warning = frozenResults.earlyWarning;

  return (
    <div className="forecast-page">
      <PageHeader
        eyebrow="FORECAST & WARNING"
        title="Future-Onset Forecasting"
        description="Estimate the probability of a future attack onset from recent temporal network history, then convert elevated probability into an operational early-warning signal."
      />

      <div className="forecast-analysis-row">
        <AnalysisState active duration={5600} readyLabel="FORECAST READY" />

        <div
          className={`forecast-scenario-badge forecast-scenario-${scenario}`}
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
        <small>Scenario context only · frozen benchmark evidence below</small>
      </div>

      {/* Main forecasting panel */}
      <section className="forecast-main-panel">
        <div className="forecast-panel-header">
          <div>
            <div className="forecast-panel-kicker">FUTURE-ONSET FORECAST</div>

            <h2>Temporal History → Forecast Benchmark</h2>

            <p>
              GRU-134 uses recent 30-second network states to estimate the
              probability of an attack onset across multiple future horizons.
            </p>
          </div>

          <div className="forecast-model-badge">
            <span />
            GRU-134
          </div>
        </div>

        <div className="forecast-history-strip">
          <div className="forecast-history-label">
            <span>INPUT HISTORY</span>
            <strong>5 MIN</strong>
          </div>

          <div className="forecast-history-windows">
            {["T−150s", "T−120s", "T−90s", "T−60s", "T−30s", "NOW"].map(
              (time, index) => (
                <div
                  key={time}
                  className={`forecast-history-window ${
                    index === 5 ? "forecast-history-current" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.55}s` }}
                >
                  <span />
                  <small>{time}</small>
                </div>
              ),
            )}
          </div>

          <div className="forecast-history-arrow">
            <span className="forecast-flow-line" />
            <span className="forecast-flow-particle" />
          </div>

          <div className="forecast-history-output">
            <span>FORECAST</span>
            <strong>5 HORIZONS</strong>
          </div>
        </div>

        <div className="forecast-horizon-area">
          <div className="forecast-axis-label">
            <span>PR-AUC BY FORECAST HORIZON</span>
            <small>GRU-134 · MULTI-HORIZON</small>
          </div>

          <div className="forecast-horizon-chart">
            <div className="forecast-grid-lines">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className="forecast-y-axis">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>

            <div className="forecast-bars">
              {forecast.horizons.map((item, index) => (
                <div
                  className={`forecast-bar-column ${
                    item.probability >= 90
                      ? "forecast-bar-critical"
                      : item.probability >= 60
                        ? "forecast-bar-elevated"
                        : "forecast-bar-watch"
                  }`}
                  key={item.seconds}
                  style={{ animationDelay: `${index * 0.35}s` }}
                >
                  <div className="forecast-bar-value">
                    {item.probability.toFixed(1)}%
                  </div>

                  <div className="forecast-bar-track">
                    <div
                      className="forecast-bar-fill"
                      style={{ height: `${item.probability}%` }}
                    >
                      <span />
                    </div>
                  </div>

                  <div className="forecast-bar-horizon">+{item.seconds}s</div>

                  <small>
                    {item.seconds === 30
                      ? "NEAR"
                      : item.seconds === 60
                        ? "SHORT"
                        : item.seconds === 150
                          ? "MID"
                          : item.seconds === 300
                            ? "LONG"
                            : "EXTENDED"}
                  </small>
                </div>
              ))}
            </div>
          </div>

          <div className="forecast-chart-note">
            <span />
            Held-out GRU-134 PR-AUC at each evaluated forecast horizon. These
            are benchmark scores, not scenario-specific probabilities.
          </div>
        </div>

        <div className="forecast-threshold-row">
          <div className="forecast-threshold-line">
            <span className="forecast-threshold-marker" />
            <div>
              <strong>OPERATIONAL WARNING THRESHOLD</strong>
              <small>
                Fixed threshold evaluation · selected without test-set tuning
              </small>
            </div>
          </div>

          <div className="forecast-threshold-value">0.90</div>
        </div>
      </section>

      {/* Operational warning */}
      <section className="forecast-warning-panel">
        <div className="forecast-warning-header">
          <div>
            <div className="forecast-panel-kicker">
              OPERATIONAL EARLY WARNING
            </div>
            <h2>Forecast → Warning Signal</h2>
          </div>

          <div className="forecast-warning-status">
            <span />
            EVENT-LEVEL EVIDENCE
          </div>
        </div>

        <div className="forecast-warning-content">
          <div className="warning-event-visual">
            <div className="warning-event-label">
              <span>ATTACK ONSET</span>
              <strong>DETECTED</strong>
            </div>

            <div className="warning-timeline">
              <div className="warning-track">
                <div className="warning-progress" />
                <span className="warning-progress-particle" />
                <span className="warning-pulse warning-pulse-one" />
                <span className="warning-pulse warning-pulse-two" />
                <span className="warning-onset-marker" />
              </div>

              <div className="warning-timeline-labels">
                <span>WARNING</span>
                <span>LEAD TIME</span>
                <span>ONSET</span>
              </div>
            </div>

            <div className="warning-lead">
              <strong>{warning.medianLeadSeconds}s</strong>
              <span>MEDIAN WARNING LEAD</span>
            </div>
          </div>

          <div className="warning-stat-grid">
            <div className="warning-stat warning-stat-primary">
              <span>EVENTS DETECTED</span>
              <strong>
                {warning.detected}
                <small> / {warning.total}</small>
              </strong>
              <em>{warning.detectionRate.toFixed(3)}%</em>
            </div>

            <div className="warning-stat">
              <span>MEAN LEAD</span>
              <strong>{warning.meanLeadSeconds.toFixed(1)}s</strong>
              <small>across detected events</small>
            </div>

            <div className="warning-stat">
              <span>MINIMUM LEAD</span>
              <strong>{warning.minimumLeadSeconds}s</strong>
              <small>observed</small>
            </div>

            <div className="warning-stat">
              <span>MAXIMUM LEAD</span>
              <strong>{warning.maximumLeadSeconds}s</strong>
              <small>observed</small>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence cards */}
      <div className="forecast-evidence-grid">
        <div className="forecast-evidence-card">
          <div className="forecast-card-header">MULTI-HORIZON EVIDENCE</div>

          <div className="forecast-evidence-main">
            <strong>60s</strong>
            <span>0.712 PR-AUC</span>
          </div>

          <div className="forecast-comparison">
            <div>
              <span>STATIC LR</span>
              <strong>0.640</strong>
            </div>

            <div className="forecast-comparison-arrow">→</div>

            <div>
              <span>TEMPORAL GRU</span>
              <strong>0.712</strong>
            </div>
          </div>

          <p>
            At the 60-second horizon, temporal GRU forecasting outperformed the
            static baseline, supporting the value of recent history.
          </p>
        </div>

        <div className="forecast-evidence-card">
          <div className="forecast-card-header">WARNING PERFORMANCE</div>

          <div className="forecast-warning-score">
            <strong>13 / 14</strong>
            <span>INDEPENDENT ONSET EVENTS DETECTED</span>
          </div>

          <div className="forecast-mini-metrics">
            <div>
              <span>DETECTION</span>
              <strong>92.857%</strong>
            </div>

            <div>
              <span>MEDIAN LEAD</span>
              <strong>120s</strong>
            </div>
          </div>

          <p>
            Fixed-threshold evaluation produced event-level early-warning
            evidence on held-out onset events.
          </p>
        </div>

        <div className="forecast-evidence-card forecast-boundary-card">
          <div className="forecast-card-header">TIME-TO-EVENT BOUNDARY</div>

          <div className="forecast-boundary-main">
            <strong>NOT A COUNTDOWN</strong>
            <span>COARSE CALIBRATED RANGE ONLY</span>
          </div>

          <div className="forecast-boundary-list">
            <div>
              <span />
              <p>Exact continuous TTE was not validated.</p>
            </div>

            <div>
              <span />
              <p>Exact discrete TTE was not validated.</p>
            </div>

            <div>
              <span />
              <p>
                Forecast probability is converted to warning lead
                retrospectively.
              </p>
            </div>
          </div>

          <div className="forecast-boundary-foot">
            <span>60s MASS</span>
            <strong>60%</strong>
            <em>58.82% TEST COVERAGE</em>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastWarning;