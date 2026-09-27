import React from "react";
import PageHeader from "../components/PageHeader";

const safeguards = [
  {
    title: "Chronological evaluation",
    tag: "ENFORCED",
    text: "Train, validation, and test periods are ordered in time. Later periods remain held out from earlier-stage fitting and model selection.",
  },
  {
    title: "Train-only preprocessing",
    tag: "ENFORCED",
    text: "Scalers and fitted preprocessing are learned from training data only, then applied to validation and test periods without refitting on future data.",
  },
  {
    title: "No temporal / target leakage",
    tag: "ENFORCED",
    text: "Future labels are used only to construct forecast targets and evaluate predictions. Label-derived target information is excluded from predictor features.",
  },
  {
    title: "Continuity and gap preservation",
    tag: "ENFORCED",
    text: "Histories and transitions do not cross capture-file boundaries or real temporal gaps. Histories use consecutive, correctly aligned 30-second windows.",
  },
  {
    title: "Fixed history and alignment",
    tag: "ENFORCED",
    text: "Temporal sequences use 10 observed windows (5 minutes) with explicit window alignment. Missing representations are not silently fabricated.",
  },
  {
    title: "Independent event accounting",
    tag: "ENFORCED IN BOOK 3",
    text: "For event-level early-warning evaluation, multiple source windows leading to the same genuine onset are not counted as separate independent attack events.",
  },
  {
    title: "Frozen evidence and reproducibility",
    tag: "ENFORCED",
    text: "Validated artifacts and selected models remain frozen for the dashboard. Scenario selection highlights illustrative context or a frozen record; it does not retrain models or rewrite benchmark results.",
  },
  {
    title: "Scope-bounded generalization",
    tag: "CLAIM CONTROL",
    text: "Results are attributed only to the dataset, component, split, and evaluation actually tested. Independent temporal-dynamics validation is not presented as full-stack detector validation.",
  },
];

const evidenceRows = [
  {
    layer: "CIC-IDS2018 (Book 2)",
    status: "PRIMARY FULL-STACK EVALUATION",
    detail: "Detector, contextual intelligence, novelty / OOD, progression, semantic MITRE interpretation, explainability, and early-warning state are evaluated within the CIC18 evidence scope.",
  },
  {
    layer: "TON-IoT (Book 3)",
    status: "PROMOTED FORECASTING EVIDENCE",
    detail: "Dataset-specific future attack-onset forecasting and event-level early warning. Forecast horizons: 30s, 60s, 150s, 300s, and 600s; 10 × 30-second historical windows.",
  },
  {
    layer: "UNSW-NB15 (UNSW15)",
    status: "TEMPORAL-DYNAMICS VALIDATION",
    detail: "Independent validation of the frozen temporal-dynamics / Koopman component only, not the complete attack-detection stack.",
  },
];

const forecastMetrics = [
  { label: "GRU-134 test PR-AUC", value: "1.000", note: "TON-IoT · 300s and 600s horizons" },
  { label: "Event warning", value: "13 / 14", note: "300s horizon · held-out events detected" },
  { label: "Event detection rate", value: "92.86%", note: "300s horizon · event-level evaluation" },
  { label: "Median warning lead", value: "120s", note: "Measured on evaluated test events" },
  { label: "TTE-range coverage", value: "85.71%", note: "150s horizon · experimental / supporting" },
  { label: "Median TTE-range width", value: "120s", note: "Exploratory calibrated range · not an exact countdown" },
];

function ResearchIntegrity() {
  return (
    <div className="integrity-page">
      <PageHeader
        eyebrow="RESEARCH INTEGRITY"
        title="Evidence, Validation & Claim Boundaries"
        description="A transparent record of the safeguards used to control leakage, preserve temporal validity, and keep every DRISHTI claim within the evidence that supports it."
      />

      <section className="integrity-summary-banner">
        <div className="integrity-summary-mark">✓</div>
        <div>
          <span className="integrity-kicker">VALIDATION PRINCIPLE</span>
          <h2>Evidence first. Claims stay within scope.</h2>
          <p>Research safeguards are part of the system design, not an afterthought. Promoted, supporting, experimental, and unclaimed capabilities are kept distinct.</p>
        </div>
      </section>

      <section className="integrity-section">
        <div className="integrity-section-heading">
          <div>
            <span className="integrity-kicker">01 / EXPERIMENTAL SAFEGUARDS</span>
            <h2>What we deliberately prevented</h2>
          </div>
          <span className="integrity-section-count">{safeguards.length} CONTROLS</span>
        </div>
        <div className="integrity-safeguard-grid">
          {safeguards.map((item, index) => (
            <article className="integrity-safeguard-card" key={item.title}>
              <div className="integrity-card-topline">
                <span className="integrity-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="integrity-status-pill">{item.tag}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="integrity-section">
        <div className="integrity-section-heading">
          <div>
            <span className="integrity-kicker">02 / DATASET & VALIDATION SCOPE</span>
            <h2>What each dataset actually validates</h2>
          </div>
        </div>
        <div className="integrity-scope-list">
          {evidenceRows.map((row, index) => (
            <article className="integrity-scope-row" key={row.layer}>
              <div className="integrity-scope-number">0{index + 1}</div>
              <div className="integrity-scope-main">
                <h3>{row.layer}</h3>
                <span>{row.status}</span>
                <p>{row.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="integrity-section integrity-forecast-section">
        <div className="integrity-section-heading">
          <div>
            <span className="integrity-kicker">03 / BOOK 3 · TON-IoT</span>
            <h2>Attack-onset forecasting & early warning</h2>
            <p className="integrity-section-description">Book 3 reports promoted, dataset-specific future-onset forecasting and event-level warning evidence. This is distinct from the earlier CIC18 onset-forecasting branch, which was not promoted. Neither result implies universal prediction or zero-shot transfer.</p>
          </div>
          <span className="integrity-promoted-badge"><i /> PROMOTED EVIDENCE</span>
        </div>
        <div className="integrity-forecast-metrics">
          {forecastMetrics.map((metric) => (
            <article className="integrity-forecast-metric" key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <small>{metric.note}</small>
            </article>
          ))}
        </div>
        <div className="integrity-forecast-footnote">
          <strong>Protocol:</strong> TON-IoT native labels define genuine benign-to-attack onset and are used for target construction / evaluation only. Historical input is 10 consecutive 30-second windows; horizons are 30s, 60s, 150s, 300s, and 600s. Event-level warning uses a fixed threshold, with lead time measured on evaluated events.
        </div>
      </section>

      <section className="integrity-section">
        <div className="integrity-section-heading">
          <div>
            <span className="integrity-kicker">04 / DATASET-SCOPED FORECASTING</span>
            <h2>Forecasting claims are dataset-specific</h2>
          </div>
        </div>
        <div className="integrity-boundary-grid">
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">CIC-IDS2018 · NOT PROMOTED</span>
            <h3>Earlier genuine-onset forecasting branch</h3>
            <p>The CIC18 held-out onset-forecasting branch was not promoted. The dashboard does not present it as a validated CIC18 forecasting capability.</p>
          </article>
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">TON-IoT · PROMOTED WITHIN SCOPE</span>
            <h3>Book 3 future attack-onset forecasting</h3>
            <p>TON-IoT supports a dataset-specific forecast formulation, event-level warning evaluation, fixed-threshold operation, and measured warning lead time. It does not establish cross-dataset transfer.</p>
          </article>
        </div>
      </section>

      <section className="integrity-section">
        <div className="integrity-section-heading">
          <div>
            <span className="integrity-kicker">05 / LIMITATIONS & CLAIM DISCIPLINE</span>
            <h2>What we do not claim</h2>
          </div>
        </div>
        <div className="integrity-boundary-grid">
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">EXPERIMENTAL / NOT PROMOTED</span>
            <h3>Exact continuous time-to-event (TTE)</h3>
            <p>Discrete TTE and a coarse calibrated range were explored, but an exact continuous countdown is not validated.</p>
          </article>
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">INDEPENDENT COMPONENT VALIDATION</span>
            <h3>UNSW-NB15 temporal dynamics</h3>
            <p>The frozen 10×10 linear unregularized Koopman model reduced 30-second state-prediction MSE by 20.67% versus persistence across 27,212 valid rollouts, with zero cross-split transitions. This validates the temporal-dynamics component, not the full attack detector.</p>
          </article>
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">NOT CLAIMED</span>
            <h3>Zero-shot cross-dataset transfer</h3>
            <p>Datasets are evaluated within their defined scopes. TON-IoT forecasting and UNSW15 temporal-dynamics results do not establish zero-shot transfer of the complete system.</p>
          </article>
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">NOT CLAIMED</span>
            <h3>Universal attack prediction</h3>
            <p>Performance is bounded by the datasets, events, and conditions evaluated. The system does not guarantee detection or forecasting for arbitrary networks.</p>
          </article>
          <article className="integrity-boundary-card">
            <span className="integrity-boundary-label">TESTED · NOT PROMOTED</span>
            <h3>Exploratory branches</h3>
            <p>GUDHI / TDA, regime or change-point analysis, and unrestricted recursive raw-feature Koopman rollouts were not retained as promoted core capabilities.</p>
          </article>
        </div>
      </section>

      <div className="integrity-final-note">
        <span className="integrity-final-dot" />
        <p><strong>Dashboard boundary:</strong> scenario-driven UI values are illustrative. Frozen benchmark metrics and research evidence remain unchanged by scenario switching.</p>
      </div>
    </div>
  );
}

export default ResearchIntegrity;
