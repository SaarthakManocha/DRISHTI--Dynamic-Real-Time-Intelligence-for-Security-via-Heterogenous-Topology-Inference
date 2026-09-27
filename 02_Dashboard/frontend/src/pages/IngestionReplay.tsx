import React, { useEffect, useMemo, useState, useRef } from "react";
import PageHeader from "../components/PageHeader";
import { frozenResults } from "../data/results";
import type { Scenario } from "../types";

interface IngestionReplayProps {
  scenario: Scenario;
}

type PipelineStatus = "waiting" | "processing" | "complete";

interface PipelineStage {
  id: string;
  number: string;
  label: string;
  subtitle: string;
  duration: number;
}

const pipelineStages: PipelineStage[] = [
  {
    id: "ingest",
    number: "01",
    label: "INGEST",
    subtitle: "INPUT INGESTION",
    duration: 2200,
  },
  {
    id: "window",
    number: "02",
    label: "WINDOW",
    subtitle: "TEMPORAL WINDOWING",
    duration: 2800,
  },
  {
    id: "represent",
    number: "03",
    label: "REPRESENT",
    subtitle: "STATE REPRESENTATION",
    duration: 3400,
  },
  {
    id: "assess",
    number: "04",
    label: "ASSESS",
    subtitle: "THREAT ASSESSMENT",
    duration: 3900,
  },
  {
    id: "forecast",
    number: "05",
    label: "FORECAST",
    subtitle: "FUTURE FORECAST",
    duration: 4600,
  },
  {
    id: "intel",
    number: "06",
    label: "INTEL",
    subtitle: "ATTACK INTELLIGENCE",
    duration: 3500,
  },
  {
    id: "warn",
    number: "07",
    label: "WARN",
    subtitle: "EARLY WARNING",
    duration: 3000,
  },
];

const analysisMessages = [
  "Network evidence accepted",
  "Temporal boundaries identified",
  "30-second windows constructed",
  "State representation assembled",
  "Threat state assessed",
  "Future-onset probabilities calculated",
  "Attack intelligence contextualized",
  "Early-warning signal evaluated",
];

function IngestionReplay({ scenario }: IngestionReplayProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };
  const [inputType, setInputType] = useState<"pcap" | "flow">("flow");
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [activeStage, setActiveStage] = useState(-1);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [visibleMessages, setVisibleMessages] = useState(0);

  const activeStageData = useMemo(
    () =>
      activeStage >= 0
        ? pipelineStages[activeStage]
        : null,
    [activeStage]
  );

  const startAnalysis = () => {
    if (running) return;

    setRunning(true);
    setCompleted(false);
    setActiveStage(0);
    setCompletedStages([]);
    setVisibleMessages(0);
  };

  const resetAnalysis = () => {
    setRunning(false);
    setCompleted(false);
    setActiveStage(-1);
    setCompletedStages([]);
    setVisibleMessages(0);
  };

  useEffect(() => {
    if (!running || activeStage < 0) return;

    const currentStage = pipelineStages[activeStage];

    const timer = window.setTimeout(() => {
      setCompletedStages((previous) =>
        previous.includes(activeStage)
          ? previous
          : [...previous, activeStage]
      );

      const messageCountByStage = [1, 1, 1, 1, 1, 2, 1];

      const messagesToShow = messageCountByStage
        .slice(0, activeStage + 1)
        .reduce((total, count) => total + count, 0);

      setVisibleMessages(messagesToShow);

      if (activeStage < pipelineStages.length - 1) {
        setActiveStage((previous) => previous + 1);
      } else {
        setActiveStage(-1);
        setRunning(false);
        setCompleted(true);
        setVisibleMessages(analysisMessages.length);
      }
    }, currentStage.duration);

    return () => window.clearTimeout(timer);
  }, [running, activeStage]);

  const stageStatus = (index: number): PipelineStatus => {
    if (completedStages.includes(index)) return "complete";
    if (index === activeStage && running) return "processing";
    return "waiting";
  };

  return (
    <div className="ingestion-page">
      <PageHeader
        eyebrow="INGESTION & ANALYSIS"
        title="End-to-End DRISHTI Analysis"
        description="Process network evidence through the complete DRISHTI analytical pipeline from input ingestion to future-onset warning."
      />

      {/* -------------------------------------------------------
          INPUT CONSOLE
      ------------------------------------------------------- */}

      <section className="ingestion-console">
        <div className="ingestion-console-header">
          <div>
            <div className="ingestion-kicker">NETWORK EVIDENCE</div>

            <h2>Input → Analyze → Understand</h2>

            <p>
              Provide network evidence and process it through the DRISHTI
              analytical pipeline.
            </p>
          </div>

          <div className="ingestion-console-state">
            <span className="ingestion-state-dot" />
            {completed
              ? "ANALYSIS COMPLETE"
              : running
                ? "ANALYSIS IN PROGRESS"
                : "READY FOR ANALYSIS"}
          </div>
        </div>

        <div className="ingestion-input-tabs">
          <button
            className={`ingestion-input-tab ${
              inputType === "pcap" ? "active" : ""
            }`}
            onClick={() => {
              setInputType("pcap");
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            type="button"
          >
            <span className="input-tab-icon">◎</span>

            <span>
              <strong>PACKET CAPTURE</strong>
              <small>PCAP / PCAPNG</small>
            </span>
          </button>

          <button
            className={`ingestion-input-tab ${
              inputType === "flow" ? "active" : ""
            }`}
            onClick={() => {
              setInputType("flow");
              setSelectedFile(null);
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            type="button"
          >
            <span className="input-tab-icon">▦</span>

            <span>
              <strong>FLOW RECORDS</strong>
              <small>CSV / FLOW DATA</small>
            </span>
          </button>
        </div>

        <div className="ingestion-input-zone">
          <input
            ref={fileInputRef}
            type="file"
            accept={inputType === "pcap" ? ".pcap,.pcapng" : ".csv,.json"}
            onChange={handleFileSelect}
            hidden
          />

          <div className="ingestion-input-icon">
            {inputType === "pcap" ? "◈" : "▦"}
          </div>

          <div className="ingestion-input-copy">
            <strong>
              {selectedFile
                ? selectedFile.name
                : inputType === "pcap"
                  ? "Select packet capture"
                  : "Select flow records"}
            </strong>

            <span>
              {selectedFile
                ? "Evidence file selected and ready for analysis"
                : "Provide network evidence for the DRISHTI analysis pipeline"}
            </span>
          </div>

          <button
            className="ingestion-browse-button"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedFile ? "CHANGE INPUT" : "SELECT INPUT"}
          </button>
        </div>

        <div className="ingestion-input-footer">
          <span>
            <i />
            {inputType === "pcap"
              ? "Packet capture input"
              : "Flow record input"}
          </span>

          <span className="ingestion-input-note">
            Evidence is processed through the analytical pipeline
          </span>
        </div>

        <div className="ingestion-actions">
          <button
            className="ingestion-run-button"
            type="button"
            onClick={startAnalysis}
            disabled={running}
          >
            <span className="run-button-pulse" />
            {running ? "ANALYSIS RUNNING" : "RUN DRISHTI ANALYSIS"}
          </button>

          {(running || completed) && (
            <button
              className="ingestion-reset-button"
              type="button"
              onClick={resetAnalysis}
            >
              RESET
            </button>
          )}
        </div>
      </section>

      {/* -------------------------------------------------------
          ANALYTICAL PIPELINE
      ------------------------------------------------------- */}

      <section className="ingestion-pipeline-section">
        <div className="ingestion-section-heading">
          <div>
            <div className="ingestion-kicker">DRISHTI ANALYTICAL PIPELINE</div>

            <h2>Evidence → State → Forecast → Intelligence</h2>

            <p>
              Every analytical stage contributes to the final
              situational-awareness output.
            </p>
          </div>

          <div className="pipeline-counter">
            <strong>
              {completedStages.length.toString().padStart(2, "0")}
            </strong>

            <span>/ 07</span>

            <small>PIPELINE STAGES</small>
          </div>
        </div>

        <div className="ingestion-pipeline">
          <div className="pipeline-spine" />

          <div className="pipeline-particle-track">
            <span className="pipeline-particle" />
          </div>

          {pipelineStages.map((stage, index) => {
            const status = stageStatus(index);

            return (
              <React.Fragment key={stage.id}>
                <div className={`pipeline-stage pipeline-stage-${status}`}>
                  <div className="pipeline-stage-number">{stage.number}</div>

                  <div className="pipeline-node">
                    <span className="pipeline-node-core" />

                    <span className="pipeline-node-ring pipeline-ring-one" />
                    <span className="pipeline-node-ring pipeline-ring-two" />
                  </div>

                  <div className="pipeline-stage-copy">
                    <strong>{stage.label}</strong>
                    <small>{stage.subtitle}</small>

                    <span className="pipeline-stage-status">
                      {status === "complete"
                        ? "COMPLETE"
                        : status === "processing"
                          ? "PROCESSING"
                          : "WAITING"}
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {activeStageData && running && (
          <div className="pipeline-processing-readout">
            <div className="processing-indicator">
              <span />
              PROCESSING
            </div>

            <strong>{activeStageData.label}</strong>

            <span>{activeStageData.subtitle}</span>

            <div className="processing-progress">
              <span />
            </div>
          </div>
        )}

        <div className="analysis-stream">
          <div className="analysis-stream-header">
            <span>ANALYSIS STREAM</span>

            <small>
              {running
                ? "LIVE PIPELINE ACTIVITY"
                : completed
                  ? "ANALYSIS COMPLETE"
                  : "AWAITING ANALYSIS"}
            </small>
          </div>

          <div className="analysis-stream-list">
            {analysisMessages.map((message, index) => {
              const visible = index < visibleMessages;

              return (
                <div
                  key={message}
                  className={`analysis-stream-item ${visible ? "visible" : ""}`}
                >
                  <span className="stream-marker">{visible ? "✓" : "○"}</span>

                  <span>{message}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------
    RESULTS
------------------------------------------------------- */}

      {completed && (
        <section className="ingestion-results-section">
          {/* RESULTS HEADER */}
          <div className="ingestion-section-heading results-heading">
            <div>
              <div className="ingestion-kicker">DRISHTI ANALYSIS RESULTS</div>

              <h2>Situational Awareness Output</h2>

              <p>
                Analysis evidence corresponding to the selected network
                evidence, from temporal window construction through future-onset
                forecasting and event-level early warning.
              </p>
            </div>

            <div className="results-complete-indicator">
              <span />
              ANALYSIS COMPLETE
            </div>
          </div>

          {/* =====================================================
        01 · NETWORK STATE
    ===================================================== */}

          <div className="results-wide-card network-state-result result-accent-cyan">
            <div className="result-card-heading">
              <div>
                <span>01</span>
                <strong>NETWORK STATE</strong>
              </div>

              <small>30-SECOND TEMPORAL REPRESENTATION</small>
            </div>

            <div className="result-card-explanation">
              <div>
                <strong>What it represents</strong>
                <p>
                  DRISHTI converts network traffic into a structured 30-second
                  temporal state containing behavioral, structural, topological,
                  and telemetry information.
                </p>
              </div>

              <div>
                <strong>Why it matters</strong>
                <p>
                  A structured state gives the downstream models a consistent
                  representation of how the network is behaving at each point in
                  time.
                </p>
              </div>
            </div>

            <div className="network-result-grid">
              <div className="result-stat-primary">
                <span>WINDOW</span>
                <strong>30s</strong>
              </div>

              <div className="result-stat-primary">
                <span>SOURCE FILES</span>
                <strong>13</strong>
              </div>

              <div className="result-stat-primary">
                <span>30s WINDOWS</span>
                <strong>13,720</strong>
              </div>

              <div className="result-stat-primary">
                <span>GENUINE ONSETS</span>
                <strong>94</strong>
              </div>

              <div className="network-feature-stack">
                <span>ATTACK WINDOWS</span>
                <strong>7,846</strong>
                <small>LABEL = ATTACK</small>
              </div>

              <div className="network-feature-stack">
                <span>BENIGN WINDOWS</span>
                <strong>5,874</strong>
                <small>LABEL = BENIGN</small>
              </div>

              <div className="network-feature-stack">
                <span>CONTINUOUS TRANSITIONS</span>
                <strong>13,686</strong>
                <small>WINDOW TRANSITIONS</small>
              </div>

              <div className="network-feature-stack">
                <span>USABLE HISTORIES</span>
                <strong>72</strong>
                <small>5-MIN ONSET HISTORY</small>
              </div>
            </div>
          </div>

          {/* =====================================================
        02 · THREAT + 03 · FORECAST
    ===================================================== */}

          <div className="results-two-column">
            {/* THREAT ASSESSMENT */}

            <div className="results-card threat-result-card result-accent-red">
              <div className="result-card-heading">
                <div>
                  <span>02</span>
                  <strong>THREAT ASSESSMENT</strong>
                </div>

                <small>CURRENT STATE</small>
              </div>

              <div className="result-card-explanation compact">
                <strong>What it represents</strong>
                <p>
                  SELECTED NETWORK EVIDENCE contains 7,846 attack windows and
                  5,874 benign windows across the audited 30-second temporal
                  representation.
                </p>
              </div>
              <div className="ingestion-threat-summary">
                <div className="ingestion-threat-profile">
                  <strong>ATTACK-STATE EVIDENCE</strong>
                  <span>
                    LABEL-BASED TEMPORAL STATE ACROSS 13,720 AUDITED WINDOWS
                  </span>
                </div>

                <div className="ingestion-threat-count">
                  <strong>7,846</strong>
                  <span>ATTACK WINDOWS</span>
                </div>
              </div>

              <div className="ingestion-threat-breakdown">
                <div className="threat-breakdown-item attack">
                  <span>ATTACK WINDOWS</span>
                  <strong>7,846</strong>
                  <small>label = attack</small>
                </div>

                <div className="threat-breakdown-item benign">
                  <span>BENIGN WINDOWS</span>
                  <strong>5,874</strong>
                  <small>label = benign</small>
                </div>

                <div className="threat-breakdown-item">
                  <span>TOTAL WINDOWS</span>
                  <strong>13,720</strong>
                  <small>30-second temporal windows</small>
                </div>

                <div className="threat-breakdown-item">
                  <span>GENUINE ONSETS</span>
                  <strong>94</strong>
                  <small>independently identified</small>
                </div>
              </div>
              <div className="result-card-footnote">
                <span />
                TON-IOT LABEL-BASED ATTACK-STATE EVIDENCE
              </div>
            </div>

            {/* FORECAST */}

            <div className="results-card forecast-result-card result-accent-violet">
              <div className="result-card-heading">
                <div>
                  <span>03</span>
                  <strong>FUTURE-ONSET FORECAST</strong>
                </div>

                <small>GRU-134 · PR-AUC BY HORIZON</small>
              </div>

              <div className="result-card-explanation compact">
                <strong>What it represents</strong>
                <p>
                  The temporal forecasting model estimates the probability of an
                  attack onset occurring within multiple future horizons from
                  recent network history.
                </p>
              </div>

              <div className="forecast-result-list">
                {frozenResults.forecast.horizons.map((horizon) => (
                  <div key={horizon.seconds}>
                    <span>+{horizon.seconds}s</span>

                    <div className="forecast-result-track">
                      <span
                        style={{
                          width: `${horizon.probability}%`,
                        }}
                      />
                    </div>

                    <strong>{(horizon.probability / 100).toFixed(3)}</strong>
                  </div>
                ))}
              </div>

              <div className="forecast-result-insight">
                <strong>Why it matters</strong>
                <p>
                  SELECTED NETWORK EVIDENCE GRU-134 forecasting is evaluated
                  across multiple future-onset horizons. These are held-out
                  evaluation scores, not a live per-file probability.
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
        04 · TEMPORAL DYNAMICS
    ===================================================== */}

          <div className="results-wide-card world-result-card result-accent-teal">
            <div className="result-card-heading">
              <div>
                <span>04</span>
                <strong>TEMPORAL DYNAMICS</strong>
              </div>

              <small>TON-IOT TTE SUPPORT</small>
            </div>

            <div className="result-card-explanation">
              <div>
                <strong>What it represents</strong>
                <p>
                  Coarse calibrated time-to-event ranges provide supporting
                  uncertainty information around the selected forecast horizons.
                </p>
              </div>

              <div>
                <strong>Why it matters</strong>
                <p>
                  The ranges add timing context without presenting an exact
                  attack countdown, which was not validated.
                </p>
              </div>
            </div>

            <div className="world-result-grid">
              <div className="world-result-metric">
                <span>60s MASS</span>
                <strong>60%</strong>
                <small>calibrated probability mass</small>
              </div>

              <div className="world-result-arrow">→</div>

              <div className="world-result-metric world-result-learned">
                <span>60s COVERAGE</span>
                <strong>58.82%</strong>
                <small>test coverage</small>
              </div>

              <div className="world-improvement">
                <strong>12.35s</strong>

                <span>MEAN INTERVAL WIDTH</span>

                <small>coarse calibrated range</small>
              </div>
            </div>
          </div>

          {/* =====================================================
        05 · EARLY WARNING
    ===================================================== */}

          <div className="results-wide-card warning-result-card result-accent-green">
            <div className="result-card-heading">
              <div>
                <span>05</span>
                <strong>EARLY WARNING</strong>
              </div>

              <small>EVENT-LEVEL EVIDENCE</small>
            </div>

            <div className="result-card-explanation">
              <div>
                <strong>What it represents</strong>
                <p>
                  On held-out onset events, a fixed operational threshold
                  converts elevated future-onset probability into an event-level
                  warning signal.
                </p>
              </div>

              <div>
                <strong>Why it matters</strong>
                <p>
                  This is the main operational result: warning is measured
                  before independently identified attack-onset events.
                </p>
              </div>
            </div>

            <div className="warning-result-grid">
              <div className="warning-primary">
                <span>EVENTS DETECTED</span>

                <strong>
                  {frozenResults.earlyWarning.detected}

                  <small>/ {frozenResults.earlyWarning.total}</small>
                </strong>

                <em>independent onset events</em>
              </div>

              <div>
                <span>DETECTION</span>

                <strong>
                  {frozenResults.earlyWarning.detectionRate.toFixed(3)}%
                </strong>

                <small>event detection rate</small>
              </div>

              <div>
                <span>MEDIAN LEAD</span>

                <strong>{frozenResults.earlyWarning.medianLeadSeconds}s</strong>

                <small>typical warning lead</small>
              </div>

              <div>
                <span>MEAN LEAD</span>

                <strong>
                  {frozenResults.earlyWarning.meanLeadSeconds.toFixed(1)}s
                </strong>

                <small>across detected events</small>
              </div>

              <div>
                <span>OBSERVED RANGE</span>

                <strong>
                  {frozenResults.earlyWarning.minimumLeadSeconds}s{" → "}
                  {frozenResults.earlyWarning.maximumLeadSeconds}s
                </strong>

                <small>observed warning lead</small>
              </div>
            </div>

            <div className="result-card-footnote warning-footnote">
              <span />
              FIXED THRESHOLD · HELD-OUT EVENT EVALUATION
            </div>
          </div>

          {/* =====================================================
        06 · 07 · 08 INTELLIGENCE
    ===================================================== */}

          <div className="results-three-column">
            {/* ATTACK INTELLIGENCE */}

            <div className="results-card intelligence-result-card result-accent-cyan">
              <div className="result-card-heading">
                <div>
                  <span>06</span>
                  <strong>ANALYST INTELLIGENCE</strong>
                </div>
              </div>

              <div className="result-card-explanation compact">
                <strong>What it represents</strong>

                <p>
                  The replay consolidates onset, history, continuity, and
                  attack-state evidence into an analyst-facing summary.
                </p>
              </div>

              <div className="intelligence-result-stat">
                <strong>72</strong>

                <span>USABLE ONSET HISTORIES</span>

                <small>5-minute history available before onset</small>
              </div>

              <div className="intelligence-result-list">
                <div>
                  <span>CONTINUOUS TRANSITIONS</span>
                  <strong>13,686</strong>
                </div>

                <div>
                  <span>GENUINE ONSETS</span>
                  <strong>94</strong>
                </div>
              </div>

              <div className="intelligence-result-list">
                <div>
                  <span>ATTACK WINDOWS</span>
                  <strong>7,846</strong>
                </div>

                <div>
                  <span>BENIGN WINDOWS</span>
                  <strong>5,874</strong>
                </div>
              </div>

              <div className="result-card-footnote">
                <span />
                DATASET AUDIT + ONSET CONTEXT
              </div>
            </div>

            {/* NOVELTY */}

            <div className="results-card novelty-result-card result-accent-violet">
              <div className="result-card-heading">
                <div>
                  <span>07</span>
                  <strong>DATASET INTEGRITY</strong>
                </div>
              </div>

              <div className="result-card-explanation compact">
                <strong>What it represents</strong>

                <p>
                  The dataset audit verifies temporal structure and preserves
                  file, gap, and continuity boundaries used for forecasting.
                </p>
              </div>

              <div className="novelty-result-grid">
                <div>
                  <span>BAD TIMESTAMPS</span>

                  <strong>0</strong>

                  <small>schema audit</small>
                </div>

                <div>
                  <span>SCHEMA ISSUES</span>

                  <strong>0</strong>

                  <small>audit result</small>
                </div>
              </div>

              <div className="novelty-bars">
                <div>
                  <span>LOCAL REVERSALS</span>

                  <strong>20</strong>

                  <i>
                    <em
                      style={{
                        width: "20%",
                      }}
                    />
                  </i>
                </div>

                <div>
                  <span>CROSSED LABEL TRANSITIONS</span>

                  <strong>0</strong>

                  <i>
                    <em
                      style={{
                        width: "0%",
                      }}
                    />
                  </i>
                </div>
              </div>

              <div className="result-card-footnote">
                <span />
                TEMPORAL AUDIT · FILE / GAP / CONTINUITY BOUNDARIES PRESERVED
              </div>
            </div>

            {/* BOUNDARY */}

            <div className="results-card boundary-result-card result-accent-amber">
              <div className="result-card-heading">
                <div>
                  <span>08</span>
                  <strong>ANALYSIS BOUNDARY</strong>
                </div>
              </div>

              <div className="result-card-explanation compact">
                <strong>Why this matters</strong>

                <p>
                  Forecasting provides future-onset probability and
                  retrospective warning lead. It does not provide an exact
                  attack countdown.
                </p>
              </div>

              <div className="boundary-result-title">NOT A COUNTDOWN</div>

              <div className="boundary-result-points">
                <div>
                  <span>01</span>
                  <p>Exact continuous TTE was not validated.</p>
                </div>

                <div>
                  <span>02</span>
                  <p>Exact discrete TTE was not validated.</p>
                </div>

                <div>
                  <span>03</span>
                  <p>Coarse calibrated ranges are supporting evidence only.</p>
                </div>
              </div>

              <div className="boundary-result-status">
                <span />
                COARSE CALIBRATED RANGE ONLY
              </div>
            </div>
          </div>

          {/* =====================================================
        FINAL SITUATIONAL AWARENESS
    ===================================================== */}

          <div className="situational-awareness-result">
            <div className="situational-awareness-header">
              <div>
                <div className="ingestion-kicker">
                  DRISHTI SITUATIONAL AWARENESS
                </div>

                <h2>Analysis → Forecast → Warning</h2>

                <p>
                  The completed evidence chain connects temporal state, held-out
                  forecast evidence, event-level warning evidence, and dataset
                  audit context.
                </p>
              </div>

              <div className="situational-awareness-status">
                <span />
                SIGNAL GENERATED
              </div>
            </div>

            <div className="situational-awareness-flow">
              <div className="situation-state">
                <span>CURRENT EVIDENCE</span>

                <strong>7,846 ATTACK WINDOWS</strong>

                <small>Label-based attack-state evidence</small>
              </div>

              <i>→</i>

              <div className="situation-forecast">
                <span>FORECAST EVIDENCE</span>

                <strong>0.780 PR-AUC</strong>

                <small>+150s held-out horizon</small>
              </div>

              <i>→</i>

              <div className="situation-warning">
                <span>WARNING EVIDENCE</span>

                <strong>120s</strong>

                <small>Median event-level lead</small>
              </div>

              <i>→</i>

              <div className="situation-intelligence">
                <span>ANALYST CONTEXT</span>

                <strong>ONSET + AUDIT</strong>

                <small>History, continuity and dataset integrity</small>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default IngestionReplay;