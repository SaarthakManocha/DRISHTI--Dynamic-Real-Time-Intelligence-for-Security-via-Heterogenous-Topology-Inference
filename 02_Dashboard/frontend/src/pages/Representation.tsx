import React, { useEffect, useState } from "react";
import AnalysisState from "../components/AnalysisState";
import ProgressBar from "../components/ProgressBar";
import type { Scenario } from "../types";

interface RepresentationProps {
  scenario: Scenario;
}

const scenarioView = {
  normal: {
    label: "Normal Network",
    status: "LOW RISK",
    risk: "8.4%",
    family: "BENIGN",
    progression: "STABLE",
    note: "Stable network context with low-risk activity.",
  },
  attack: {
    label: "High-Risk Known Attack",
    status: "HIGH RISK",
    risk: "98.1%",
    family: "INFILTRATION",
    progression: "SUSTAINED",
    note: "Known-pattern attack context with elevated network risk.",
  },
  novel: {
    label: "Novel / Uncertain",
    status: "REVIEW REQUIRED",
    risk: "61.7%",
    family: "UNSEEN / UNCERTAIN",
    progression: "EMERGING",
    note: "Uncertain activity context requiring analyst review.",
  },
} satisfies Record<
  Scenario,
  {
    label: string;
    status: string;
    risk: string;
    family: string;
    progression: string;
    note: string;
  }
>;

const featureGroups = [
  {
    key: "state",
    number: "01",
    label: "STATE",
    description: "Statistical network state",
    features: 46,
    accent: "cyan",
  },
  {
    key: "structure",
    number: "02",
    label: "STRUCTURE",
    description: "Traffic organization",
    features: 28,
    accent: "violet",
  },
  {
    key: "topology",
    number: "03",
    label: "TOPOLOGY",
    description: "Communication relationships",
    features: 24,
    accent: "cyan",
  },
  {
    key: "telemetry",
    number: "04",
    label: "TELEMETRY",
    description: "Flow and packet aggregates",
    features: 32,
    accent: "red",
  },
];

export default function Representation({
  scenario,
}: RepresentationProps) {
  const [analysisKey, setAnalysisKey] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    setAnalysisKey((value) => value + 1);
    setStage(0);

    const timers = [
      window.setTimeout(() => setStage(1), 500),
      window.setTimeout(() => setStage(2), 1350),
      window.setTimeout(() => setStage(3), 2150),
      window.setTimeout(() => setStage(4), 2850),
      window.setTimeout(() => setStage(5), 3600),
      window.setTimeout(() => setStage(6), 4550),
      window.setTimeout(() => setStage(7), 5550),
    ];

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [scenario]);

  return (
    <div className={`representation-page representation-scenario-${scenario}`}>
      <div className="page-header">
        <div className="page-header-copy">
          <div className="page-header-eyebrow">NETWORK REPRESENTATION</div>

          <h1 className="page-header-title">Temporal Network State</h1>

          <p className="page-header-description">
            DRISHTI converts each 30-second traffic window into a structured
            representation of network state, organization, communication
            topology, and flow telemetry.
          </p>
        </div>

        <div className="page-header-status">
          <AnalysisState
            key={analysisKey}
            active
            duration={5900}
            readyLabel="REPRESENTATION READY"
          />
        </div>
      </div>

      <div className="representation-metrics">
        <div className="representation-metric">
          <span>WINDOW</span>
          <strong>30s</strong>
          <small>Temporal backbone</small>
        </div>

        <div className="representation-metric">
          <span>CIC18 WINDOWS</span>
          <strong>9,777</strong>
          <small>Validated temporal windows</small>
        </div>

        <div className="representation-metric">
          <span>CORE FEATURES</span>
          <strong>130</strong>
          <small>State + Structure + Topology + Telemetry</small>
        </div>

        <div className="representation-metric">
          <span>FULL SPACE</span>
          <strong>134</strong>
          <small>Including Koopman context</small>
        </div>
      </div>

      <div className={`representation-scenario-strip representation-scenario-strip-${scenario}`}>
        <div className="representation-scenario-copy">
          <span className="representation-scenario-kicker">CURRENT DEMO SCENARIO</span>
          <strong>{scenarioView[scenario].label}</strong>
          <small>{scenarioView[scenario].note}</small>
        </div>

        <div className="representation-scenario-state">
          <span>{scenarioView[scenario].status}</span>
          <strong>{scenarioView[scenario].risk} <small>RISK</small></strong>
        </div>

        <div className="representation-scenario-meta">
          <span>FAMILY</span>
          <strong>{scenarioView[scenario].family}</strong>
          <span>PROGRESSION</span>
          <strong>{scenarioView[scenario].progression}</strong>
        </div>
      </div>

      <div className="representation-visual panel">
        <div className="section-header">
          <div className="section-header-copy">
            <h2 className="section-header-title">Representation Assembly</h2>

            <p className="section-header-description">
              Building the network state from complementary traffic signals.
            </p>
          </div>

          <div className="representation-window-badge">
            <span className="status-badge-dot" />
            30 SECOND WINDOW
          </div>
        </div>

        <div className="representation-stage">
          {/* =====================================================
              TRAFFIC INPUT
              ===================================================== */}

          <div
            className={[
              "traffic-visual",
              stage >= 1 ? "traffic-visual-active" : "",
            ].join(" ")}
          >
            <div className="traffic-visual-header">
              <div className="traffic-visual-icon">⇢</div>

              <div>
                <strong>NETWORK TRAFFIC</strong>
                <span>Flow-level observations</span>
              </div>
            </div>

            <div className="traffic-network">
              <svg
                viewBox="0 0 380 230"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {/* Dense incoming paths */}
                <path
                  className="traffic-path traffic-cyan"
                  d="M-20 25 C70 10 100 95 180 105 S280 120 405 92"
                />

                <path
                  className="traffic-path traffic-cyan"
                  d="M-20 48 C55 35 110 115 180 110 S300 100 405 115"
                />

                <path
                  className="traffic-path traffic-violet"
                  d="M-20 72 C70 130 105 45 180 105 S300 135 405 108"
                />

                <path
                  className="traffic-path traffic-violet"
                  d="M-20 98 C60 150 120 80 180 110 S300 90 405 128"
                />

                <path
                  className="traffic-path traffic-red"
                  d="M-20 125 C70 70 100 165 180 112 S300 100 405 143"
                />

                <path
                  className="traffic-path traffic-red"
                  d="M-20 150 C65 100 120 190 180 115 S300 120 405 158"
                />

                <path
                  className="traffic-path traffic-cyan"
                  d="M-20 176 C60 130 120 210 180 120 S305 130 405 175"
                />

                <path
                  className="traffic-path traffic-violet"
                  d="M-20 202 C70 160 115 215 180 125 S300 150 405 190"
                />

                {/* Secondary thinner paths */}
                <path
                  className="traffic-path traffic-secondary"
                  d="M-20 37 C80 75 110 70 180 108 S300 110 405 100"
                />

                <path
                  className="traffic-path traffic-secondary"
                  d="M-20 160 C90 115 125 170 180 118 S305 140 405 165"
                />

                {/* Traffic nodes */}
                {[
                  [48, 50],
                  [82, 108],
                  [116, 74],
                  [150, 135],
                  [183, 105],
                  [220, 88],
                  [250, 126],
                  [286, 99],
                  [320, 132],
                  [352, 108],
                ].map(([cx, cy], index) => (
                  <circle
                    key={`node-${index}`}
                    className="traffic-node"
                    cx={cx}
                    cy={cy}
                    r={index % 3 === 0 ? 4 : 3}
                  />
                ))}

                {/* Packets */}
                {Array.from({ length: 20 }).map((_, index) => (
                  <circle
                    key={`packet-${index}`}
                    className={`traffic-packet traffic-packet-${index % 4}`}
                    cx={20 + ((index * 47) % 340)}
                    cy={30 + ((index * 31) % 170)}
                    r={index % 3 === 0 ? 2.8 : 2}
                  />
                ))}
              </svg>
            </div>

            <div className="traffic-stats">
              <div>
                <strong>1,842</strong>
                <span>FLOWS</span>
              </div>

              <div>
                <strong>12.4K</strong>
                <span>PACKETS</span>
              </div>

              <div>
                <strong>286</strong>
                <span>ENTITIES</span>
              </div>

              <div>
                <strong>4</strong>
                <span>PROTOCOLS</span>
              </div>
            </div>

            <div className="traffic-legend">
              <span>
                <i className="traffic-dot traffic-dot-cyan" />
                TCP
              </span>

              <span>
                <i className="traffic-dot traffic-dot-violet" />
                UDP
              </span>

              <span>
                <i className="traffic-dot traffic-dot-red" />
                ICMP
              </span>

              <span>
                <i className="traffic-dot traffic-dot-other" />
                OTHER
              </span>
            </div>
          </div>

          {/* =====================================================
              TRAFFIC → WINDOW
              ===================================================== */}

          <div
            className={[
              "traffic-window-path",
              stage >= 2 ? "traffic-window-path-active" : "",
            ].join(" ")}
          >
            <span />
          </div>

          {/* =====================================================
              30 SECOND WINDOW
              ===================================================== */}

          <div
            className={[
              "window-node",
              stage >= 2 ? "window-node-visible" : "",
            ].join(" ")}
          >
            <div className="window-scan-line" />

            <strong>30s</strong>
            <span>WINDOW</span>

            <small>TEMPORAL STATE</small>
          </div>

          {/* =====================================================
              WINDOW → FEATURE STREAMS
              ===================================================== */}

          <svg
            className={[
              "feature-streams",
              stage >= 3 ? "feature-streams-active" : "",
            ].join(" ")}
            viewBox="0 0 53 295"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="feature-stream feature-stream-cyan"
              d="M0 160 C12 160 22 37 53 37"
            />

            <path
              className="feature-stream feature-stream-violet"
              d="M0 160 C14 160 25 110 53 110"
            />

            <path
              className="feature-stream feature-stream-cyan"
              d="M0 160 C14 160 25 190 53 190"
            />

            <path
              className="feature-stream feature-stream-red"
              d="M0 160 C12 160 22 270 53 270"
            />
          </svg>

          {/* =====================================================
              FEATURE GROUPS
              ===================================================== */}

          <div className="representation-groups">
            {featureGroups.map((group, index) => {
              const visible = stage >= index + 3;

              return (
                <div
                  key={group.key}
                  className={[
                    "representation-group",
                    `representation-group-${group.accent}`,
                    visible ? "representation-group-visible" : "",
                  ].join(" ")}
                >
                  <div className="representation-group-number">
                    {group.number}
                  </div>

                  <div className="representation-group-copy">
                    <div className="representation-group-top">
                      <strong>{group.label}</strong>

                      <span>{group.features} FEATURES</span>
                    </div>

                    <p>{group.description}</p>

                    <div className="representation-group-bar">
                      <span
                        style={{
                          width: `${(group.features / 46) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =====================================================
              FEATURE GROUPS → TOTAL MERGE
              ===================================================== */}

          <svg
            className={[
              "merge-streams",
              stage >= 6 ? "merge-streams-active" : "",
            ].join(" ")}
            viewBox="0 0 40 268"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="merge-stream merge-cyan"
              d="M0 34 C10 34 12 134 40 134"
            />

            <path
              className="merge-stream merge-violet"
              d="M0 112 C10 112 15 134 40 134"
            />

            <path
              className="merge-stream merge-cyan"
              d="M0 190 C10 190 15 134 40 134"
            />

            <path
              className="merge-stream merge-red"
              d="M0 268 C10 268 12 134 40 134"
            />

            <path className="merge-core" d="M0 134 L40 134" />
          </svg>

          {/* =====================================================
              SINGLE 134 OUTPUT
              ===================================================== */}

          <div
            className={[
              "total-node",
              stage >= 7 ? "total-node-visible" : "",
            ].join(" ")}
          >
            <div className="total-ring">
              {Array.from({ length: 28 }).map((_, index) => (
                <span
                  key={index}
                  style={
                    {
                      "--ring-angle": `${(index / 28) * 360}deg`,
                      "--ring-delay": `${(index % 7) * 0.14}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <div className="total-node-label">TOTAL</div>

            <strong>134</strong>

            <span>FEATURE SPACE</span>

            <small>130 CORE + 4 KOOPMAN</small>
          </div>
        </div>
      </div>

      {/* =======================================================
          LOWER PANELS
          ======================================================= */}

      <div className="representation-bottom-grid">
        <div className="panel representation-breakdown-panel">
          <div className="section-header">
            <div className="section-header-copy">
              <h2 className="section-header-title">Feature Composition</h2>

              <p className="section-header-description">
                Contribution of each representation family.
              </p>
            </div>
          </div>

          <div className="representation-breakdown">
            {featureGroups.map((group) => (
              <div key={group.key} className="representation-breakdown-row">
                <div className="representation-breakdown-label">
                  <span
                    className={`representation-dot representation-dot-${group.accent}`}
                  />

                  <strong>{group.label}</strong>
                </div>

                <div className="representation-breakdown-bar">
                  <ProgressBar
                    value={(group.features / 130) * 100}
                    accent={
                      group.accent === "violet"
                        ? "violet"
                        : group.accent === "red"
                          ? "red"
                          : "cyan"
                    }
                  />
                </div>

                <strong className="representation-breakdown-value">
                  {group.features}
                </strong>
              </div>
            ))}
          </div>
        </div>

        <div className="panel representation-explanation-panel">
          <div className="section-header">
            <div className="section-header-copy">
              <h2 className="section-header-title">
                Why the Representation Matters
              </h2>

              <p className="section-header-description">
                The representation gives downstream temporal models a structured
                view of evolving network behavior.
              </p>
            </div>
          </div>

          <div className="representation-explanation-list">
            <div>
              <span>01</span>
              <p>
                <strong>State</strong> captures statistical properties of the
                current network condition.
              </p>
            </div>

            <div>
              <span>02</span>
              <p>
                <strong>Structure</strong> captures how traffic is organized
                within the temporal window.
              </p>
            </div>

            <div>
              <span>03</span>
              <p>
                <strong>Topology</strong> captures communication relationships
                between observed entities.
              </p>
            </div>

            <div>
              <span>04</span>
              <p>
                <strong>Telemetry</strong> contributes flow and packet behavior
                signals used by downstream assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}