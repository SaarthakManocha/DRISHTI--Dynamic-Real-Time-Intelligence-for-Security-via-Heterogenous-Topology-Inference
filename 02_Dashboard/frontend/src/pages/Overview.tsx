import React from "react";
import PageHeader from "../components/PageHeader";
import MetricCard from "../components/MetricCard";
import AnimatedNumber from "../components/AnimatedNumber";
import ProgressBar from "../components/ProgressBar";
import Pipeline from "../components/Pipeline";
import SectionHeader from "../components/SectionHeader";
import StatusBadge from "../components/StatusBadge";
import { scenarioConfig } from "../data/scenarios";
import { frozenResults } from "../data/results";
import type { Scenario } from "../types";

interface OverviewProps {
  scenario: Scenario;
}

export default function Overview({
  scenario,
}: OverviewProps) {
  const currentScenario = scenarioConfig[scenario];

  return (
    <div className="overview-page">
      <PageHeader
        eyebrow="Command Center"
        title="Network Situational Awareness"
        description="DRISHTI combines temporal network representation, threat assessment, temporal dynamics, future-onset forecasting, and early-warning evidence into a single operational view."
        readyLabel="EVIDENCE READY"
      />

      {/* Headline metrics */}
      <div className="metric-grid metric-grid-four">
        <MetricCard
          label="Validated Windows"
          value="9,777"
          description="CIC18 temporal windows"
          accent="cyan"
          eyebrow="CIC18"
        />

        <MetricCard
          label="Validated Flows"
          value="16.23M"
          description="Flow-level research evidence"
          accent="violet"
          eyebrow="DATA"
        />

        <MetricCard
          label="Detector PR-AUC"
          value={frozenResults.cic18.detectorPrAuc.toFixed(3)}
          description="Primary temporal detector"
          accent="green"
          eyebrow="PROMOTED"
        />

        <MetricCard
          label="Early-Warning Events"
          value={`${frozenResults.earlyWarning.detected}/${frozenResults.earlyWarning.total}`}
          description="Independent onset events detected"
          accent="red"
          eyebrow="TON-IoT"
        />
      </div>

      {/* Current scenario */}
      <div className="overview-grid overview-grid-primary">
        <section className="panel scenario-panel">
          <SectionHeader
            title="Current Scenario"
            description="Presentation scenario mapped to the frozen evidence layer."
            action={
              <StatusBadge
                status={
                  scenario === "normal"
                    ? "normal"
                    : scenario === "novel"
                      ? "warning"
                      : "promoted"
                }
                label={currentScenario.shortLabel}
              />
            }
          />

          <div className="scenario-main">
            <div className="scenario-risk-block">
              <div className="scenario-risk-label">
                CURRENT DEMO RISK
              </div>

              <div className="scenario-risk-value">
                <AnimatedNumber
                  value={currentScenario.risk}
                  duration={1100}
                />
                <span>%</span>
              </div>

              <div className="scenario-risk-caption">
                Scenario-level presentation signal
              </div>
            </div>

            <div className="scenario-details">
              <div className="scenario-detail">
                <span>ATTACK FAMILY</span>
                <strong>{currentScenario.family}</strong>
              </div>

              <div className="scenario-detail">
                <span>PROGRESSION</span>
                <strong>{currentScenario.progression}</strong>
              </div>

              <div className="scenario-detail">
                <span>NOVELTY</span>
                <strong>{currentScenario.novelty}%</strong>
              </div>
            </div>
          </div>

          <div className="scenario-risk-bar">
            <ProgressBar
              value={currentScenario.risk}
              label="Scenario risk signal"
              accent={
                scenario === "normal"
                  ? "green"
                  : scenario === "novel"
                    ? "violet"
                    : "red"
              }
            />
          </div>

          <div className="demo-disclaimer">
            Scenario risk and novelty values are deterministic
            presentation-layer values. They are not new model
            inference and do not modify the frozen research results.
          </div>
        </section>

        <section className="panel evidence-panel">
          <SectionHeader
            title="Research Evidence"
            description="Selected promoted findings from the frozen experiment package."
          />

          <div className="evidence-list">
            <div className="evidence-row">
              <div>
                <div className="evidence-title">
                  Temporal detector
                </div>
                <div className="evidence-description">
                  State + Structure + Topology with 10-window history
                </div>
              </div>

              <StatusBadge status="promoted" />
            </div>

            <div className="evidence-row">
              <div>
                <div className="evidence-title">
                  World model
                </div>
                <div className="evidence-description">
                  Koopman dynamics improve 30s prediction MSE by
                  20.67% over persistence
                </div>
              </div>

              <StatusBadge status="promoted" />
            </div>

            <div className="evidence-row">
              <div>
                <div className="evidence-title">
                  Early warning
                </div>
                <div className="evidence-description">
                  13 of 14 independent onset events detected
                </div>
              </div>

              <StatusBadge status="promoted" />
            </div>

            <div className="evidence-row">
              <div>
                <div className="evidence-title">
                  Counterfactual explanation
                </div>
                <div className="evidence-description">
                  Top-1 agreement 70% · Top-3 agreement 95%
                </div>
              </div>

              <StatusBadge status="promoted" />
            </div>
          </div>
        </section>
      </div>

      {/* Pipeline */}
      <section className="panel pipeline-panel">
        <SectionHeader
          title="DRISHTI Analytical Pipeline"
          description="From temporal traffic representation to actionable early warning."
          action={
            <StatusBadge
              status="validated"
              label="FROZEN PIPELINE"
            />
          }
        />

        <Pipeline
          stages={[
            {
              label: "Ingest",
              description: "Flow evidence",
            },
            {
              label: "Window",
              description: "30s temporal state",
            },
            {
              label: "State",
              description: "Network representation",
            },
            {
              label: "Dynamics",
              description: "Temporal context",
            },
            {
              label: "Risk",
              description: "Threat assessment",
            },
            {
              label: "Forecast",
              description: "Future onset",
            },
            {
              label: "Warning",
              description: "Early warning",
            },
          ]}
          activeIndex={6}
          completedThrough={5}
        />
      </section>

      {/* Forecast + warning */}
      <div className="overview-grid overview-grid-secondary">
        <section className="panel forecast-panel">
          <SectionHeader
            title="Future-Onset Forecast"
            description="GRU-134 probability of attack onset across future horizons."
            action={
              <StatusBadge
                status="promoted"
                label="GRU-134"
              />
            }
          />

          <div className="forecast-list">
            {frozenResults.forecast.horizons.map(
              (horizon) => (
                <div
                  className="forecast-row"
                  key={horizon.seconds}
                >
                  <div className="forecast-time">
                    <strong>{horizon.seconds}s</strong>
                    <span>HORIZON</span>
                  </div>

                  <div className="forecast-bar">
                    <ProgressBar
                      value={horizon.probability}
                      showValue={false}
                      height="small"
                      accent={
                        horizon.probability >= 90
                          ? "red"
                          : horizon.probability >= 60
                            ? "violet"
                            : "cyan"
                      }
                    />
                  </div>

                  <div className="forecast-value">
                    {horizon.probability.toFixed(1)}%
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="forecast-note">
            Forecast probabilities are frozen experimental
            evidence. They represent future-onset probability,
            not an exact countdown.
          </div>
        </section>

        <section className="panel warning-panel">
          <SectionHeader
            title="Operational Early Warning"
            description="Fixed-threshold event-level evaluation on TON-IoT."
            action={
              <StatusBadge
                status="promoted"
                label="OPERATIONAL EVIDENCE"
              />
            }
          />

          <div className="warning-stat">
            <div className="warning-stat-value">
              <AnimatedNumber
                value={frozenResults.earlyWarning.detectionRate}
                decimals={1}
                duration={1000}
                suffix="%"
              />
            </div>

            <div className="warning-stat-label">
              EVENT DETECTION
            </div>
          </div>

          <ProgressBar
            value={frozenResults.earlyWarning.detectionRate}
            label={`${frozenResults.earlyWarning.detected} of ${frozenResults.earlyWarning.total} events detected`}
            accent="green"
          />

          <div className="warning-grid">
            <div>
              <span>MEDIAN LEAD</span>
              <strong>
                {frozenResults.earlyWarning.medianLeadSeconds}s
              </strong>
            </div>

            <div>
              <span>MEAN LEAD</span>
              <strong>
                {frozenResults.earlyWarning.meanLeadSeconds.toFixed(
                  1,
                )}
                s
              </strong>
            </div>

            <div>
              <span>RANGE</span>
              <strong>
                {frozenResults.earlyWarning.minimumLeadSeconds}
                –
                {frozenResults.earlyWarning.maximumLeadSeconds}s
              </strong>
            </div>
          </div>
        </section>
      </div>

      {/* Integrity callout */}
      <section className="integrity-callout">
        <div className="integrity-callout-icon">
          ✓
        </div>

        <div className="integrity-callout-copy">
          <div className="integrity-callout-title">
            FROZEN RESEARCH EVIDENCE
          </div>

          <div className="integrity-callout-text">
            This dashboard presents validated experiment results
            and deterministic demonstration scenarios. It does
            not retrain models or claim live packet-level
            inference.
          </div>
        </div>

        <StatusBadge
          status="validated"
          label="SOURCE OF TRUTH"
        />
      </section>
    </div>
  );
}