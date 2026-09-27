import React from "react";
import AnalysisState from "../components/AnalysisState";
import PageHeader from "../components/PageHeader";
import { scenarioConfig } from "../data/scenarios";
import { frozenResults } from "../data/results";
import type { Scenario } from "../types";

interface ThreatAssessmentProps {
  scenario: Scenario;
}

const evidenceSignals = [
  {
    key: "temporal",
    number: "01",
    title: "TEMPORAL DETECTOR",
    description: "Historical network-state evidence",
    value: "PR-AUC 0.683",
    accent: "cyan",
  },
  {
    key: "family",
    number: "02",
    title: "ATTACK FAMILY",
    description: "Known behavioral pattern",
    value: "CLASSIFIED",
    accent: "violet",
  },
  {
    key: "progression",
    number: "03",
    title: "PROGRESSION",
    description: "Sequential threat evolution",
    value: "TRACKED",
    accent: "cyan",
  },
  {
    key: "novelty",
    number: "04",
    title: "NOVELTY SIGNAL",
    description: "Uncertainty / unfamiliarity",
    value: "ASSESSED",
    accent: "red",
  },
];

const scenarioProfiles: Record<
  Scenario,
  {
    state: string;
    level: string;
    interpretation: string;
    confidence: string;
  }
> = {
  normal: {
    state: "STABLE",
    level: "LOW RISK",
    interpretation: "Network behavior remains within the benign scenario profile.",
    confidence: "HIGH",
  },
  attack: {
    state: "ACTIVE THREAT",
    level: "HIGH RISK",
    interpretation:
      "Multiple evidence channels align with a sustained known-pattern attack scenario.",
    confidence: "HIGH",
  },
  novel: {
    state: "UNRESOLVED",
    level: "REVIEW",
    interpretation:
      "Elevated uncertainty indicates behavior requiring further investigation.",
    confidence: "MODERATE",
  },
};

export default function ThreatAssessment({
  scenario,
}: ThreatAssessmentProps) {
  const config = scenarioConfig[scenario];
  const profile = scenarioProfiles[scenario];

  return (
    <div className="page-shell threat-page">
      <PageHeader
        eyebrow="THREAT ASSESSMENT"
        title="Threat Evidence Fusion"
        description="Combining temporal, behavioral, progression, and novelty signals into a network threat state."
      />

      <div className="threat-analysis-row">
        <AnalysisState active duration={5200} readyLabel="ASSESSMENT READY" />

        <div className="threat-scenario-badge">
          <span className="threat-scenario-dot" />
          <span>{config.shortLabel}</span>
        </div>
      </div>

      <section className="threat-fusion-panel">
        <div className="threat-panel-header">
          <div>
            <div className="section-kicker">ANALYTICAL FUSION</div>
            <h2>Threat State Assembly</h2>
            <p>
              Independent evidence channels converge before the current threat
              state is presented.
            </p>
          </div>

          <div className="threat-window-badge">
            <span />
            30 SECOND STATE
          </div>
        </div>

        <div className="threat-fusion-stage">
          {/* LEFT: EVIDENCE STREAMS */}
          <div className="threat-evidence-column">
            {evidenceSignals.map((signal, index) => (
              <div
                key={signal.key}
                className={`threat-evidence-card threat-accent-${signal.accent}`}
                style={{
                  animationDelay: `${index * 0.55}s`,
                }}
              >
                <div className="threat-evidence-index">{signal.number}</div>

                <div className="threat-evidence-copy">
                  <strong>{signal.title}</strong>
                  <span>{signal.description}</span>
                </div>

                <div className="threat-evidence-value">{signal.value}</div>

                <div className="threat-evidence-bar">
                  <span />
                </div>
              </div>
            ))}
          </div>

          {/* CENTER: FUSION ENGINE */}
          <div className="threat-fusion-core">
            <div className="fusion-orbit fusion-orbit-one" />
            <div className="fusion-orbit fusion-orbit-two" />
            <div className="fusion-orbit fusion-orbit-three" />

            <div className="fusion-core-ring">
              <div className="fusion-core-inner">
                <span>FUSION</span>
                <strong>THREAT</strong>
                <small>ASSESSMENT</small>
              </div>
            </div>

            <div className="fusion-pulse fusion-pulse-one" />
            <div className="fusion-pulse fusion-pulse-two" />
            <div className="fusion-pulse fusion-pulse-three" />
          </div>

          {/* RIGHT: THREAT STATE */}
          <div className="threat-state-panel">
            <div className="threat-state-topline">
              <span>CURRENT THREAT STATE</span>
              <span className="threat-state-live">ASSESSING</span>
            </div>

            <div className="threat-score">
              <div className="threat-score-value">{config.risk}</div>
              <div className="threat-score-denominator">/ 100</div>
            </div>

            <div className={`threat-level threat-level-${scenario}`}>
              <span />
              {profile.level}
            </div>

            <div className="threat-state-name">{profile.state}</div>

            <p>{profile.interpretation}</p>

            <div className="threat-state-explanation">
              <span>WHAT THIS MEANS</span>

              <strong>
                {scenario === "attack"
                  ? "Multiple temporal and behavioral signals point toward sustained malicious activity."
                  : scenario === "novel"
                    ? "The observed behavior is sufficiently unfamiliar to warrant analyst review."
                    : "Observed behavior remains consistent with the benign network profile."}
              </strong>
            </div>

            <div className="threat-confidence">
              <span>ASSESSMENT CONFIDENCE</span>
              <strong>{profile.confidence}</strong>
            </div>

            <div className="threat-confidence-bar">
              <span
                style={{
                  width:
                    scenario === "attack"
                      ? "92%"
                      : scenario === "novel"
                        ? "64%"
                        : "88%",
                }}
              />
            </div>
          </div>

          <svg
            className="threat-connectors"
            viewBox="0 0 1100 430"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* TEMPORAL DETECTOR → FUSION */}
            <path
              className="threat-connector threat-connector-cyan"
              d="M360 44 C430 44 470 105 520 210"
            />

            {/* ATTACK FAMILY → FUSION */}
            <path
              className="threat-connector threat-connector-violet"
              d="M360 137 C435 137 470 165 520 210"
            />

            {/* PROGRESSION → FUSION */}
            <path
              className="threat-connector threat-connector-cyan"
              d="M360 259 C435 259 470 235 520 210"
            />

            {/* NOVELTY → FUSION */}
            <path
              className="threat-connector threat-connector-red"
              d="M360 352 C430 352 470 290 520 210"
            />

            {/* SINGLE FUSION OUTPUT */}
            <path className="threat-output-line" d="M580 210 L752 210" />

            {/* EXACT FUSION POINT */}
            <circle className="threat-connector-node" cx="520" cy="210" r="5" />

            {/* OUTPUT TERMINAL */}
            <circle className="threat-output-node" cx="752" cy="210" r="5" />
          </svg>
        </div>
      </section>

      {/* SECONDARY EVIDENCE ROW */}
      <section className="threat-secondary-grid">
        <div className="threat-secondary-card">
          <div className="secondary-card-header">
            <span>DETECTOR PERFORMANCE</span>
            <span className="secondary-status">PROMOTED</span>
          </div>

          <div className="secondary-metric-row">
            <div>
              <strong>{frozenResults.cic18.detectorPrAuc.toFixed(3)}</strong>
              <span>PRECISION-RECALL AUC</span>
            </div>

            <div>
              <strong>{frozenResults.cic18.detectorRocAuc.toFixed(3)}</strong>
              <span>ROC AUC</span>
            </div>
          </div>

          <div className="metric-explanations">
            <div>
              <strong>Precision-Recall AUC</strong>
              <span>
                Measures how well the detector identifies attacks while limiting
                false alarms, especially useful when attacks are less common.
              </span>
            </div>

            <div>
              <strong>ROC AUC</strong>
              <span>
                Measures how well the detector separates attack and benign
                traffic across different decision thresholds.
              </span>
            </div>
          </div>

          <p>
            Primary temporal GRU detector evaluated on held-out CIC18 network
            windows.
          </p>
        </div>

        <div className="threat-secondary-card">
          <div className="secondary-card-header">
            <span>ATTACK CONTEXT</span>

            <span className="secondary-status secondary-status-neutral">
              {config.family}
            </span>
          </div>

          <div className="context-value">{profile.state}</div>

          <div className="context-details">
            <div className="context-detail">
              <span>BEHAVIORAL PROFILE</span>
              <strong>KNOWN PATTERN</strong>
            </div>

            <div className="context-detail">
              <span>EVIDENCE FUSION</span>
              <strong>TEMPORAL + BEHAVIORAL</strong>
            </div>
          </div>

          <p>
            The assessment combines behavioral classification with temporal
            network-state evidence to characterize the current scenario.
          </p>
        </div>

        <div className="threat-secondary-card">
          <div className="secondary-card-header">
            <span>PROGRESSION SIGNAL</span>

            <span className="secondary-status secondary-status-cyan">
              {config.progression}
            </span>
          </div>

          <div className="context-value">TEMPORAL</div>

          <div className="context-details">
            <div className="context-detail">
              <span>ANALYSIS MODE</span>
              <strong>SEQUENTIAL STATE</strong>
            </div>

            <div className="context-detail">
              <span>CURRENT TRAJECTORY</span>
              <strong>{config.progression}</strong>
            </div>
          </div>

          <p>
            Network behavior is evaluated as an evolving state across successive
            temporal windows rather than as an isolated observation.
          </p>
        </div>
      </section>
    </div>
  );
}