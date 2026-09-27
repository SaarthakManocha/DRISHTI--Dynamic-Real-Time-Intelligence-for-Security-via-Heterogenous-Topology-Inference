import React, { useEffect, useMemo, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

type IngestionReplayProps = {
  scenario: Scenario;
  processing: boolean;
};

const scenarioConfig: Record<
  Scenario,
  {
    shortLabel: string;
    risk: number;
    novelty: number;
    family: string;
    progression: string;
  }
> = {
  normal: {
    shortLabel: "NORMAL NETWORK",
    risk: 12,
    novelty: 8,
    family: "BASELINE",
    progression: "STABLE",
  },

  attack: {
    shortLabel: "KNOWN-PATTERN ATTACK",
    risk: 98,
    novelty: 18,
    family: "INFILTRATION",
    progression: "SUSTAINED",
  },

  novel: {
    shortLabel: "NOVEL / UNCERTAIN",
    risk: 64,
    novelty: 55,
    family: "UNSEEN BEHAVIOR",
    progression: "EMERGING",
  },
};

const stages = [
  {
    key: "INGEST",
    process: "Ingesting network evidence",
  },
  {
    key: "WINDOW",
    process: "Building the 30-second temporal window",
  },
  {
    key: "STATE",
    process: "Computing network state representation",
  },
  {
    key: "DYNAMICS",
    process: "Evaluating temporal dynamics",
  },
  {
    key: "RISK",
    process: "Assessing current attack risk",
  },
  {
    key: "FORECAST",
    process: "Generating future attack-onset forecast",
  },
  {
    key: "WARNING",
    process: "Generating the operational warning state",
  },
];

function IngestionReplay({
  scenario,
  processing,
}: IngestionReplayProps) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const rows = useMemo(
    () => [
      [
        "10:51:31.2",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "22",
        "18",
        "8.4KB",
        "42",
        "WATCH",
      ],
      [
        "10:51:31.8",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "445",
        "31",
        "19.2KB",
        "61",
        "ELEVATED",
      ],
      [
        "10:51:32.4",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "3389",
        "27",
        "14.1KB",
        "37",
        "ELEVATED",
      ],
      [
        "10:51:33.1",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "135",
        "46",
        "27.7KB",
        "53",
        "ALERT",
      ],
      [
        "10:51:34.0",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "445",
        "58",
        "34.9KB",
        "72",
        "ALERT",
      ],
      [
        "10:51:35.2",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "3389",
        "63",
        "42.2KB",
        "81",
        "ALERT",
      ],
      [
        "10:51:36.5",
        "10.0.4.12",
        "10.0.7.21",
        "TCP",
        "445",
        "71",
        "49.6KB",
        "94",
        "ALERT",
      ],
    ],
    [],
  );

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = window.setInterval(() => {
      setProgress((current) => {
        const next = Math.min(current + 2, 100);

        if (next >= 100) {
          window.clearInterval(timer);
          setRunning(false);
        }

        return next;
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, [running]);

  const completed =
    progress >= 100;

  const stageIndex = Math.min(
    stages.length - 1,
    Math.floor(progress / (100 / stages.length)),
  );

  const currentStage =
    stages[stageIndex];

  const visibleRows = completed
    ? rows.length
    : Math.min(
        rows.length,
        Math.floor((progress / 100) * rows.length),
      );

  const scenarioData =
    scenarioConfig[scenario];

  const currentRisk = Math.round(
    28 +
      ((scenarioData.risk - 28) * progress) /
        100,
  );

  const currentNovelty = Math.round(
    18 +
      ((scenarioData.novelty - 18) * progress) /
        100,
  );

  const statusText = completed
    ? "ANALYSIS COMPLETE"
    : running
      ? "ACTIVE PROCESS"
      : "READY FOR REPLAY";

  const processText = completed
    ? "Operational warning state generated"
    : running
      ? currentStage.process
      : "Deterministic replay ready to begin";

  const startReplay = () => {
    setProgress(0);
    setRunning(true);
  };

  const resetReplay = () => {
    setProgress(0);
    setRunning(false);
  };

  return (
    <div className="page replay-page">
      <SectionHeader
        eyebrow="DETERMINISTIC INGESTION"
        title="Flow-level evidence replay"
        description="A controlled presentation replay of frozen evidence. This interface does not perform live packet capture or live model inference."
      />

      <div className="replay-toolbar">
        <div className="replay-engine-status">
          <AnalysisState
            processing={running}
            label={
              completed
                ? "ANALYSIS COMPLETE"
                : "REPLAY ENGINE"
            }
          />

          <div className="replay-process-copy">
            <span>{statusText}</span>
            <strong>{processText}</strong>
          </div>
        </div>

        <div className="replay-actions">
          <button
            className="button primary"
            onClick={startReplay}
            disabled={running}
          >
            <Play size={15} />
            {completed ? "REPLAY AGAIN" : "START"}
          </button>

          <button
            className="button secondary"
            onClick={() => setRunning(false)}
            disabled={!running}
          >
            PAUSE
          </button>

          <button
            className="button secondary"
            onClick={resetReplay}
          >
            <RotateCcw size={15} />
            RESET
          </button>
        </div>
      </div>

      <div className="replay-panel panel">
        <div className="replay-meta">
          <div>
            <span>SCENARIO</span>
            <strong>
              {scenarioData.shortLabel}
            </strong>
          </div>

          <div>
            <span>CURRENT STAGE</span>
            <strong>
              {currentStage.key}
            </strong>
          </div>

          <div>
            <span>EVENTS PROCESSED</span>
            <strong>
              {visibleRows} / {rows.length}
            </strong>
          </div>
        </div>

        <div className="replay-progress-block">
          <div className="replay-progress-label">
            <span>REPLAY PROGRESS</span>
            <strong>{Math.round(progress)}%</strong>
          </div>

          <div className="replay-progress-track">
            <div
              className={`replay-progress-fill ${
                running
                  ? "is-running"
                  : ""
              } ${
                completed
                  ? "is-complete"
                  : ""
              }`}
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        <div className="pipeline pipeline-enhanced">
          {stages.map((stage, index) => {
            const complete =
              progress >=
              ((index + 1) *
                100) /
                stages.length;

            const active =
              !complete &&
              index === stageIndex &&
              progress < 100;

            const isFinal =
              index ===
              stages.length - 1;

            return (
              <div
                className={[
                  "pipeline-item",
                  complete
                    ? "complete"
                    : "",
                  active
                    ? "active"
                    : "",
                  isFinal &&
                  completed
                    ? "final-complete"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                key={stage.key}
              >
                <div className="pipeline-node">
                  {complete
                    ? "OK"
                    : `0${index + 1}`}
                </div>

                <span>
                  {stage.key}
                </span>
              </div>
            );
          })}
        </div>

        <div className="replay-metrics">
          <MetricCard
            label="CURRENT ATTACK RISK"
            value={`${currentRisk}%`}
            description="Frozen detector evidence"
            accent="red"
          />

          <MetricCard
            label="NOVELTY / OOD"
            value={`${currentNovelty}%`}
            description="Contextual uncertainty signal"
            accent="violet"
          />

          <MetricCard
            label="BEHAVIORAL STATE"
            value={
              progress >= 80
                ? scenarioData.family
                : "ANALYZING"
            }
            description={
              progress >= 80
                ? `Progression: ${scenarioData.progression}`
                : "Evaluating behavioral pattern"
            }
          />
        </div>

        <div className="traffic-container">
          <div className="traffic-header">
            <div>
              <span className="card-eyebrow">
                TRAFFIC EVENTS
              </span>

              <strong>
                {visibleRows} / {rows.length}
              </strong>
            </div>

            <span className="muted-note">
              DETERMINISTIC DATASET REPLAY
            </span>
          </div>

          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>TIME</th>
                  <th>SRC</th>
                  <th>DST</th>
                  <th>PROTO</th>
                  <th>PORT</th>
                  <th>PACKETS</th>
                  <th>BYTES</th>
                  <th>IAT µs</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {rows
                  .slice(0, visibleRows)
                  .map(
                    (
                      row,
                      index,
                    ) => (
                      <tr
                        key={index}
                        className={
                          running
                            ? "traffic-row-enter"
                            : ""
                        }
                      >
                        {row.map(
                          (
                            cell,
                            cellIndex,
                          ) => (
                            <td
                              key={
                                cellIndex
                              }
                            >
                              {cell}
                            </td>
                          ),
                        )}
                      </tr>
                    ),
                  )}
              </tbody>
            </table>

            {visibleRows === 0 && (
              <div className="empty-table">
                <span className="empty-table-title">
                  WAITING FOR INPUT
                </span>

                <span>
                  Press START to begin
                  deterministic
                  replay.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="integrity-badges">
        <span>
          FLOW-LEVEL · VALIDATED RESEARCH
        </span>

        <span>
          PACKET-LEVEL UI · DEMO / EXTENSION
        </span>

        <span>
          NO RAW-PCAP CLAIM
        </span>

        <span>
          NO LIVE INFERENCE
        </span>
      </div>
    </div>
  );
}

export default IngestionReplay;