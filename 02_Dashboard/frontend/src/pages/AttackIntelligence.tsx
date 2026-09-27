import React from "react";
import PageHeader from "../components/PageHeader";
import AnalysisState from "../components/AnalysisState";
import { frozenResults } from "../data/results";
import { scenarioConfig } from "../data/scenarios";
import type { Scenario } from "../types";

interface AttackIntelligenceProps {
  scenario: Scenario;
}

function AttackIntelligence({ scenario }: AttackIntelligenceProps) {
  const config = scenarioConfig[scenario];

  const xai = frozenResults.xai;
  const novelty = frozenResults.novelty;

  const scenarioEvidence = {
    normal: {
      window: "8140",
      title: "Benign reference state",
      status: "NO ATTACK SIGNAL",
      description: "The frozen reference window is marked benign, with approximately 0% detector probability and no attack family assigned.",
      risk: "~0%",
      family: "BENIGN",
      progression: "STABLE / NORMAL",
      confidence: "Reference window",
      rowClass: "normal",
    },
    attack: {
      window: "8472",
      title: "Known high-risk attack pattern",
      status: "CONFIDENT KNOWN PATTERN",
      description: "The frozen evidence records a 98.14% detector probability, 52.66% attack traffic, and a high-confidence Infilteration family label.",
      risk: "98.14%",
      family: "INFILTRATION",
      progression: "SUSTAINED",
      confidence: "95.22% family confidence",
      rowClass: "high",
    },
    novel: {
      window: "7380",
      title: "Novel / uncertain attack pattern",
      status: "ANALYST REVIEW CONTEXT",
      description: "The frozen evidence records elevated detector risk but low family confidence, high entropy, and an uncertain pattern. This is an uncertainty signal, not a confirmed novel family.",
      risk: "79.29%",
      family: "UNCERTAIN · INFILTRATION",
      progression: "ESCALATING",
      confidence: "25.22% family confidence",
      rowClass: "review",
    },
  }[scenario];

  return (
    <div className="intelligence-page">
      <PageHeader
        eyebrow="ATTACK INTELLIGENCE"
        title="Threat Intelligence & Explainability"
        description="Transform detected network behavior into contextual attack intelligence through family analysis, novelty assessment, explainability, and semantic technique mapping."
      />

      <div className="intelligence-analysis-row">
        <AnalysisState active duration={5600} readyLabel="INTELLIGENCE READY" />

        <div
          className={`intelligence-scenario-badge intelligence-scenario-${scenario}`}
        >
          <span />
          {config.shortLabel}
        </div>
      </div>

      {/* =====================================================
          INTELLIGENCE FUSION
          ===================================================== */}

      <section className="intelligence-main-panel">
        <div className="intelligence-panel-header">
          <div>
            <div className="intelligence-panel-kicker">INTELLIGENCE FUSION</div>

            <h2>Threat Signal → Analyst Context</h2>

            <p>
              Multiple analytical signals are combined to characterize the
              observed behavior, estimate novelty, explain model decisions, and
              attach semantic attack context.
            </p>
          </div>

          <div className="intelligence-fusion-badge">
            <span />
            MULTI-SIGNAL ANALYSIS
          </div>
        </div>

        <div className="intelligence-fusion-stage">
          {/* INPUT */}
          <div className="intelligence-input-column">
            <div className="intelligence-section-label">
              <span>OBSERVED SIGNAL</span>
              <small>NETWORK STATE</small>
            </div>

            <div className="intelligence-signal-card">
              <div className="signal-grid" />

              <div className="signal-rings">
                <span />
                <span />
                <span />
              </div>

              <div className="signal-core">
                <span>THREAT</span>
                <strong>STATE</strong>
                <small>130 FEATURES</small>
              </div>

              <div className="signal-particle signal-particle-one" />
              <div className="signal-particle signal-particle-two" />
              <div className="signal-particle signal-particle-three" />
              <div className="signal-particle signal-particle-four" />
            </div>

            <div className="intelligence-signal-caption">
              <span className="intelligence-live-dot" />
              FEATURE SPACE ANALYZED
            </div>
          </div>

          {/* CONNECTOR */}
          <div className="intelligence-fusion-connector">
            <div className="fusion-line">
              <span />
              <span />
              <span />
            </div>

            <small>ANALYZE</small>
          </div>

          {/* FUSION CORE */}
          <div className="intelligence-core-column">
            <div className="intelligence-section-label">
              <span>INTELLIGENCE ENGINE</span>
              <small>CONTEXTUAL ANALYSIS</small>
            </div>

            <div className="intelligence-core">
              <div className="intelligence-core-orbit intelligence-orbit-one" />
              <div className="intelligence-core-orbit intelligence-orbit-two" />
              <div className="intelligence-core-orbit intelligence-orbit-three" />

              <span className="intelligence-core-particle intelligence-core-particle-one" />
              <span className="intelligence-core-particle intelligence-core-particle-two" />
              <span className="intelligence-core-particle intelligence-core-particle-three" />

              <div className="intelligence-core-center">
                <span>DRISHTI</span>
                <strong>INTEL</strong>
                <small>FUSION</small>
              </div>
            </div>

            <div className="intelligence-core-caption">SIGNALS → CONTEXT</div>
          </div>

          {/* CONNECTOR */}
          <div className="intelligence-fusion-connector intelligence-fusion-connector-right">
            <div className="fusion-line">
              <span />
              <span />
              <span />
            </div>

            <small>INTERPRET</small>
          </div>

          {/* OUTPUTS */}
          <div className="intelligence-output-column">
            <div className="intelligence-section-label">
              <span>ANALYST CONTEXT</span>
              <small>4 INTELLIGENCE LAYERS</small>
            </div>

            <div className="intelligence-output-stack">
              <div className="intelligence-output-card intelligence-family-card">
                <div className="intelligence-output-icon">
                  <span />
                  <span />
                  <span />
                </div>

                <div>
                  <strong>ATTACK FAMILY</strong>
                  <small>EXPLORATORY CLASSIFICATION</small>
                </div>

                <em>86.83%</em>
              </div>

              <div className="intelligence-output-card intelligence-novelty-card">
                <div className="intelligence-output-icon">
                  <span />
                  <span />
                </div>

                <div>
                  <strong>NOVELTY</strong>
                  <small>UNCERTAINTY / OOD SIGNAL</small>
                </div>

                <em>90.92%</em>
              </div>

              <div className="intelligence-output-card intelligence-xai-card">
                <div className="intelligence-output-icon">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <div>
                  <strong>EXPLAINABILITY</strong>
                  <small>COUNTERFACTUAL AGREEMENT</small>
                </div>

                <em>TOP-3 · 95%</em>
              </div>

              <div className="intelligence-output-card intelligence-mitre-card">
                <div className="intelligence-output-icon">
                  <span />
                  <span />
                  <span />
                </div>

                <div>
                  <strong>MITRE SEMANTICS</strong>
                  <small>TECHNIQUE CONTEXT</small>
                </div>

                <em>23 MAPPINGS</em>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          NOVELTY / UNCERTAINTY
          ===================================================== */}

      <section className="intelligence-novelty-panel">
        <div className="intelligence-panel-header">
          <div>
            <div className="intelligence-panel-kicker">
              NOVELTY & UNCERTAINTY
            </div>

            <h2>Known Pattern → Uncertain State</h2>

            <p>
              Uncertainty signals help separate confident known behavior from
              states that warrant analyst review.
            </p>
          </div>

          <div className="intelligence-uncertainty-badge">
            <span />
            OOD EVIDENCE
          </div>
        </div>

        <div className="intelligence-novelty-content">
          <div className="novelty-distribution">
            <div className="novelty-distribution-header">
              <span>UNSEEN FUTURE BOT WINDOWS</span>
              <strong>{novelty.unseenFutureBotWindows}</strong>
            </div>

            <div className="novelty-bar">
              <div
                className="novelty-segment novelty-high"
                style={{ width: `${novelty.highUncertaintyPercent}%` }}
              >
                <span>55.26%</span>
              </div>

              <div
                className="novelty-segment novelty-review"
                style={{ width: `${novelty.reviewRequiredPercent}%` }}
              >
                <span>32.60%</span>
              </div>

              <div
                className="novelty-segment novelty-known"
                style={{ width: `${novelty.confidentKnownPercent}%` }}
              >
                <span>12.13%</span>
              </div>
            </div>

            <div className="novelty-legend">
              <div>
                <span className="legend-dot novelty-dot-high" />
                <strong>HIGH UNCERTAINTY</strong>
                <small>55.26%</small>
              </div>

              <div>
                <span className="legend-dot novelty-dot-review" />
                <strong>REVIEW REQUIRED</strong>
                <small>32.60%</small>
              </div>

              <div>
                <span className="legend-dot novelty-dot-known" />
                <strong>CONFIDENT KNOWN</strong>
                <small>12.13%</small>
              </div>
            </div>
          </div>

          <div className="novelty-metrics">
            <div className="novelty-metric">
              <span>ENTROPY PR-AUC</span>
              <strong>{novelty.entropyPrAuc.toFixed(3)}</strong>
              <small>uncertainty ranking</small>
            </div>

            <div className="novelty-metric">
              <span>CONFIDENCE PR-AUC</span>
              <strong>{novelty.confidencePrAuc.toFixed(3)}</strong>
              <small>confidence ranking</small>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          INTELLIGENCE EVIDENCE
          ===================================================== */}

      <div className="intelligence-evidence-grid">
        <div className="intelligence-evidence-card">
          <div className="intelligence-card-header">ATTACK FAMILY ANALYSIS</div>

          <div className="intelligence-score-row">
            <strong>86.83%</strong>
            <span>ACCURACY</span>
          </div>

          <div className="intelligence-secondary-score">
            <span>MACRO-F1</span>
            <strong>0.843</strong>
          </div>

          <p>
            Exploratory attack-family classification provides contextual
            information about observed behavior. It is treated as promising
            intelligence rather than a promoted operational classifier.
          </p>

          <div className="intelligence-status-note">
            <span />
            EXPLORATORY / CONTEXTUAL
          </div>
        </div>

        <div className="intelligence-evidence-card">
          <div className="intelligence-card-header">
            COUNTERFACTUAL EXPLAINABILITY
          </div>

          <div className="intelligence-xai-score">
            <div>
              <span>TOP-1</span>
              <strong>{xai.top1Agreement}%</strong>
            </div>

            <div>
              <span>TOP-3</span>
              <strong>{xai.top3Agreement}%</strong>
            </div>
          </div>

          <div className="xai-agreement-track">
            <div
              className="xai-agreement-fill"
              style={{ width: `${xai.top3Agreement}%` }}
            />
          </div>

          <p>
            Counterfactual feature agreement measures whether the model's
            highlighted features remain consistent under controlled changes.
          </p>

          <div className="intelligence-status-note intelligence-status-promoted">
            <span />
            PROMOTED EVIDENCE
          </div>
        </div>

        <div className="intelligence-evidence-card">
          <div className="intelligence-card-header">MITRE ATT&CK SEMANTICS</div>

          <div className="mitre-result">
            <strong>23</strong>
            <span>MAPPINGS</span>
          </div>

          <div className="mitre-families">
            <span>14</span>
            <small>ATT&CK FAMILIES</small>
          </div>

          <div className="mitre-flow">
            <span>OBSERVED SIGNAL</span>
            <b>→</b>
            <span>SEMANTIC CONTEXT</span>
          </div>

          <p>
            ATT&CK mappings provide semantic interpretation of detected behavior
            and are not treated as a supervised ATT&CK classifier.
          </p>

          <div className="intelligence-status-note">
            <span />
            SEMANTIC INTERPRETATION
          </div>
        </div>
      </div>

      {/* =====================================================
          FLAGGED NETWORK EVIDENCE
          ===================================================== */}

      <section className="intelligence-flagged-panel">
          <div className="intelligence-panel-header">
            <div>
              <div className="intelligence-panel-kicker">
                FLAGGED NETWORK EVIDENCE
              </div>

              <h2>Detector-Backed Window Assessment</h2>

              <p>
                Representative CIC-IDS2018 windows retained from the frozen
                detector evidence record, showing network-level risk and
                contextual attack intelligence.
              </p>
            </div>

            <div className="intelligence-flagged-badge">
              <span />
              FROZEN EVIDENCE
            </div>
          </div>

          <div className="flagged-evidence-note">
            <span>WINDOW-LEVEL EVIDENCE</span>
            <small>
              CIC-IDS2018 · 30s temporal representation · frozen research record
            </small>
          </div>

          <div className={`intelligence-selected-evidence intelligence-selected-${scenario}`}>
            <div className="intelligence-selected-topline">
              <span>SCENARIO-ALIGNED REFERENCE</span>
              <strong>WINDOW {scenarioEvidence.window}</strong>
              <em>{scenarioEvidence.status}</em>
            </div>
            <div className="intelligence-selected-body">
              <div className="intelligence-selected-copy">
                <h3>{scenarioEvidence.title}</h3>
                <p>{scenarioEvidence.description}</p>
              </div>
              <div className="intelligence-selected-metrics">
                <div><span>DETECTOR RISK</span><strong>{scenarioEvidence.risk}</strong></div>
                <div><span>FAMILY CONTEXT</span><strong>{scenarioEvidence.family}</strong><small>{scenarioEvidence.confidence}</small></div>
                <div><span>PROGRESSION</span><strong>{scenarioEvidence.progression}</strong></div>
              </div>
            </div>
            <div className="intelligence-selected-footnote">
              Representative network evidence is presented alongside detector risk, attack-family context, and behavioral progression to support analyst interpretation.
            </div>
          </div>

          <div className="flagged-evidence-table">
            <div className="flagged-evidence-head">
              <span>WINDOW</span>
              <span>DETECTOR RISK</span>
              <span>ATTACK RATIO</span>
              <span>ATTACK FAMILY</span>
              <span>PROGRESSION</span>
            </div>

            <div className={`flagged-evidence-row flagged-evidence-high ${scenario === "attack" ? "flagged-evidence-selected" : ""}`}>
              <div className="flagged-window">
                <strong>8472</strong>
                <small>HIGH-RISK WINDOW</small>
              </div>

              <div className="flagged-risk">
                <strong>98.14%</strong>
                <div className="flagged-risk-track">
                  <span style={{ width: "98.14%" }} />
                </div>
              </div>

              <div className="flagged-value">
                <strong>52.66%</strong>
                <small>ATTACK TRAFFIC</small>
              </div>

              <div className="flagged-family">
                <strong>INFILTERATION</strong>
                <small>95.22% CONFIDENCE</small>
              </div>

              <div className="flagged-progression">
                <strong>SUSTAINED</strong>
                <small>0.6595 SCORE</small>
              </div>
            </div>

            <div className={`flagged-evidence-row flagged-evidence-review ${scenario === "novel" ? "flagged-evidence-selected" : ""}`}>
              <div className="flagged-window">
                <strong>7380</strong>
                <small>UNCERTAIN WINDOW</small>
              </div>

              <div className="flagged-risk">
                <strong>79.29%</strong>
                <div className="flagged-risk-track">
                  <span style={{ width: "79.29%" }} />
                </div>
              </div>

              <div className="flagged-value">
                <strong>26.70%</strong>
                <small>ATTACK TRAFFIC</small>
              </div>

              <div className="flagged-family">
                <strong>INFILTERATION</strong>
                <small>25.22% CONFIDENCE</small>
              </div>

              <div className="flagged-progression">
                <strong>ESCALATING</strong>
                <small>HIGH UNCERTAINTY</small>
              </div>
            </div>

            <div className={`flagged-evidence-row flagged-evidence-normal ${scenario === "normal" ? "flagged-evidence-selected" : ""}`}>
              <div className="flagged-window">
                <strong>8140</strong>
                <small>REFERENCE WINDOW</small>
              </div>

              <div className="flagged-risk">
                <strong>~0%</strong>
                <div className="flagged-risk-track">
                  <span style={{ width: "2%" }} />
                </div>
              </div>

              <div className="flagged-value">
                <strong>0%</strong>
                <small>ATTACK TRAFFIC</small>
              </div>

              <div className="flagged-family">
                <strong>NORMAL</strong>
                <small>NO ATTACK FAMILY</small>
              </div>

              <div className="flagged-progression">
                <strong>NORMAL</strong>
                <small>REFERENCE STATE</small>
              </div>
            </div>
          </div>
      </section>
    </div>
  );
}

export default AttackIntelligence;