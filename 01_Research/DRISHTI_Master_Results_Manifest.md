# DRISHTI — MASTER RESULTS MANIFEST v1.1

**Status:** FROZEN  
**Project:** DRISHTI — SIH 2026  
**Purpose:** Canonical source of truth for the dashboard, demo video, PPT, README, and judge Q&A.

---

## 1. Executive System Statement

DRISHTI is a proactive cyber-threat situational-awareness system built around a 30-second temporal network representation, temporal dynamics modeling, attack detection, future attack-onset forecasting, attack intelligence, explainability, and early warning.

The central question is:

> **Not only “Is the traffic malicious?” but “Where is the network heading, and can we warn before the next attack onset?”**

The research evidence is based on frozen experiments across CIC-IDS2018, UNSW-NB15, and TON-IoT.

---

## 2. Claim Status Legend

| Status | Meaning |
|---|---|
| **PROMOTED** | Strong enough to use as a headline/project claim |
| **SUPPORTING** | Valid evidence, but should not be the central headline |
| **EXPERIMENTAL** | Useful for demonstration/research context; not fully validated |
| **PROMISING / CONTEXTUAL** | Interesting evidence, but not a universal operational claim |
| **NOT PROMOTED** | Result is retained for scientific honesty but should not be marketed |
| **NOT VALIDATED** | Do not present as a validated capability |
| **BOUNDARY** | Explicit implementation/research limitation |

---

# 3. Foundation — 30-Second Temporal Backbone

## PROMOTED

DRISHTI converts raw network-flow observations into fixed **30-second temporal windows**.

The temporal backbone preserves:

- chronology
- temporal gaps
- continuity boundaries
- explicit window IDs
- train/validation/test temporal separation
- future-data isolation

### CIC-IDS2018 audit

- **9,777 temporal windows**
- **16,232,929 validated flows**
- **167 temporal segments**
- **9,610 valid within-segment transitions**
- **2,450 attack windows**
- **216 genuine attack onsets**

### TON-IoT audit

- **12,339,021 raw rows**
- **13 CSV files**
- **13,720 30-second windows**
- **7,846 attack windows**
- **5,874 benign windows**
- **13,686 continuous transitions**
- **94 genuine attack onsets**
- **72 onsets with usable 5-minute history**

TON-IoT timestamp audit:

- Unix timestamps parsed explicitly
- Schema issues: **0**
- Bad timestamps: **0**
- 20 local non-monotonic reversals
- No reversal crossed a label transition

Ground truth in TON-IoT is based on:

> `label == 1`

The `type` field is used for interpretation/stratification, not as a predictor.

---

# 4. Network Representation

DRISHTI separates network information into distinct conceptual feature groups.

## State

Represents the current network state.

## Structure

Represents structural/relational properties.

## Communication Topology

Represents observable communication relationships.

## Flow / Packet Telemetry

Represents measurable traffic statistics.

### TON-IoT feature space

- State: **46**
- Structure: **28**
- Communication Topology: **24**
- Flow/packet telemetry: **32**
- Koopman residual context: **4**
- Total strict feature space: **134**

### CIC18

The validated architecture uses State + Structure + Topology as the clean temporal representation, with telemetry treated as complementary evidence.

---

# 5. World Model / Koopman Temporal Dynamics

## PROMOTED as temporal-dynamics representation

The World Model uses Koopman-style temporal dynamics to model how the network representation evolves over time.

### UNSW-NB15 result

At a 30-second prediction horizon:

- Persistence MSE: **1.573759**
- Koopman MSE: **1.248418**
- Improvement over persistence: **20.672870%**

This validates that the temporal-dynamics representation captures useful network evolution beyond persistence.

### Important boundary

The World Model is **not** an unrestricted physical simulator of raw network traffic.

It should be presented as:

> **A temporal-dynamics foundation / representation for network evolution.**

The validated experiments indicate useful behavior through approximately **5 minutes**, with degradation at **10–15 minutes**.

Literal recursive raw-feature forecasting is not promoted.

---

# 6. Primary Temporal Attack Detector — CIC-IDS2018

## PROMOTED

Primary temporal detector:

- 10-window history
- State + Structure + Topology
- GRU64, tanh
- Dense32, ReLU
- Dropout 0.2
- Dense1, sigmoid
- **19,201 parameters**

### Held-out performance

- **PR-AUC: 0.683022**
- **ROC-AUC: 0.796866**

This is the primary validated attack-detection result.

---

# 7. Static Baseline — CIC-IDS2018

Clean State + Structure + Topology Logistic Regression:

- **PR-AUC: 0.371025**
- **ROC-AUC: 0.640479**

This provides the static comparison against the temporal detector.

---

# 8. Flow / Telemetry Intelligence

## SUPPORTING

Telemetry Logistic Regression using Top-20 features:

- **PR-AUC: 0.490137**
- **ROC-AUC: 0.709003**

Telemetry-only temporal GRU:

- **PR-AUC: 0.600627**
- **ROC-AUC: 0.768637**

Interpretation:

> Flow telemetry provides complementary attack evidence, while the primary architecture retains a broader state/structure/topology representation.

---

# 9. Attack-Family Intelligence

## PROMISING / CONTEXTUAL

Exploratory attack-family model:

- Accuracy: **0.868290**
- Macro-F1: **0.843232**

Use this as contextual attack intelligence rather than as the main detection claim.

---

# 10. OOD / Novelty Intelligence

## PROMISING / CONTEXTUAL

Novelty evidence was evaluated using uncertainty-based signals.

### Confidence-based novelty

- **PR-AUC: 0.900057**
- **ROC-AUC: 0.856051**

### Entropy-based novelty

- **PR-AUC: 0.909211**
- **ROC-AUC: 0.868243**

Evaluation context:

- **460 known-family validation windows**
- **684 unseen future bot windows**

For the 684 unseen future bot windows:

- High-uncertainty / novel state: **378 / 684 = 55.26%**
- Review required: **223 / 684 = 32.60%**
- Confident-known: **83 / 684 = 12.13%**

### Boundary

There is **no operational OOD threshold locked**.

Do **not** claim:

> “93% novel attack detection accuracy”

Do **not** claim universal zero-day detection.

Correct framing:

> **Uncertainty-based novelty evidence that can prioritize unfamiliar or uncertain behavior for analyst review.**

---

# 11. Attack Progression

## EXPERIMENTAL / DESCRIPTIVE

Progression analysis:

- **2,022 windows**
- **216 episodes**

This is useful for showing how attack activity evolves through time.

It is not a validated universal progression predictor.

---

# 12. MITRE ATT&CK Context

## PROMOTED as semantic interpretation

Observed behavior was mapped to:

- **23 mappings**
- **14 ATT&CK families**

This is semantic/contextual interpretation.

It is **not** a supervised MITRE ATT&CK classifier.

---

# 13. Counterfactual XAI

## PROMOTED

Counterfactual explanation evaluation:

- **Top-1 agreement: 70%**
- **Top-3 agreement: 95%**

This supports the usefulness of the explanation layer for identifying influential features.

### Boundary

Counterfactual explanations are **not causal proof**.

Do not describe them as causal explanations.

---

# 14. CIC18 Early Warning

## EXPERIMENTAL

Original CIC18 early-warning analysis:

- Any elevated/watch: **64.35%**
- Any WATCH: **37.50%**

These are retained as experimental evidence.

They should not be the primary headline early-warning claim.

---

# 15. CIC18 Genuine Attack-Onset Forecasting

## NOT PROMOTED

Corrected held-out genuine-onset benchmark:

- **PR-AUC: 0.023172**
- **ROC-AUC: 0.398023**

This negative result is retained deliberately.

It demonstrates that CIC18 did **not** provide sufficient evidence for a strong genuine-onset forecasting claim under the evaluated setup.

Do not hide or replace this result.

---

# 16. TON-IoT Future Attack-Onset Forecasting

## PROMOTED

Book 3 establishes an independent future attack-onset forecasting formulation using TON-IoT.

### Genuine attack-onset definition

A genuine onset is defined using:

> previous benign state → current attack state

within the same continuous temporal segment.

The first attack in a segment is excluded where the required preceding benign context is unavailable.

### Dataset

- **13,720** 30-second windows
- **94** genuine attack onsets
- **72** onsets with usable 5-minute history
- **5,823** valid 10-window sequences

---

# 17. TON-IoT Multi-Horizon Forecasting

Forecasting horizons:

- **30 seconds**
- **60 seconds**
- **150 seconds**
- **300 seconds**
- **600 seconds**

## Base positive rates

| Horizon | Base PR |
|---:|---:|
| 30s | 0.019473 |
| 60s | 0.029851 |
| 150s | 0.040509 |
| 300s | 0.046620 |
| 600s | 0.039239 |

## Static Logistic Regression

| Horizon | PR-AUC | ROC-AUC |
|---:|---:|---:|
| 30s | 0.418290 | 0.941589 |
| 60s | 0.640451 | 0.951434 |
| 150s | 0.907725 | 0.983422 |
| 300s | 1.000000 | 1.000000 |
| 600s | 1.000000 | 1.000000 |

## GRU-130

GRU-130 uses:

> State + Structure + Topology + Telemetry

| Horizon | PR-AUC | ROC-AUC |
|---:|---:|---:|
| 30s | 0.388342 | 0.980690 |
| 60s | 0.712468 | 0.989850 |
| 150s | 0.887382 | 0.996347 |
| 300s | 1.000000 | 1.000000 |
| 600s | 1.000000 | 1.000000 |

## GRU-134

GRU-134 adds the four Koopman residual-context features.

| Horizon | PR-AUC | ROC-AUC |
|---:|---:|---:|
| 30s | 0.447679 | 0.982752 |
| 60s | 0.672451 | 0.987984 |
| 150s | 0.779661 | 0.994348 |
| 300s | 1.000000 | 1.000000 |
| 600s | 1.000000 | 1.000000 |

### Interpretation

Temporal history provides clear evidence of value at selected horizons, particularly around the 60-second horizon.

However:

> The temporal model does **not** dominate every horizon and every metric.

The 300s/600s perfect scores must be interpreted with caution because the number of positive events is small.

Do not present them as universal performance.

---

# 18. TON Feature Ablation

PR-AUC by feature group:

| Feature Set | 30s | 60s | 150s | 300s | 600s |
|---|---:|---:|---:|---:|---:|
| State | 0.5168 | 0.6525 | 0.8751 | 0.9715 | 0.9553 |
| State + Structure | 0.3906 | 0.6623 | 0.8905 | 0.9666 | 0.9503 |
| + Topology | 0.5149 | 0.7024 | 0.8761 | 0.9762 | 0.9166 |
| + Telemetry | 0.4574 | 0.6624 | 0.9076 | 1.0000 | 1.0000 |
| + Koopman | 0.4624 | 0.6665 | 0.9086 | 1.0000 | 1.0000 |

### Important interpretation

Koopman does **not** consistently improve TON-IoT forecasting.

Therefore:

> Do not claim that Koopman drives the forecasting performance.

It is better framed as a temporal-dynamics representation that complements the broader system architecture.

---

# 19. TON-IoT Event-Level Early Warning

## PROMOTED — Headline Operational Evidence

Fixed thresholds were evaluated without test-set threshold tuning.

### Headline configuration

**GRU-134 — 300-second horizon — threshold 0.90**

Results:

- **14 independent onset events evaluated**
- **13 detected**
- **1 missed**
- Event detection rate: **92.857%**
- Median warning lead: **120 seconds**
- Mean warning lead: **126.923 seconds**
- Minimum warning lead: **30 seconds**
- Maximum observed warning lead: **300 seconds**

### Core claim

> **13 of 14 independent TON-IoT attack-onset events were detected early, with a median warning lead of 120 seconds under the fixed 300-second / 0.90 operational configuration.**

This is the strongest early-warning claim in the research freeze.

---

# 20. Exact Continuous TTE

## NOT VALIDATED

DRISHTI does **not** currently validate an exact continuous “time-to-event countdown.”

Do not present:

> “Attack will happen in exactly X seconds.”

Exact continuous TTE is not a validated capability.

---

# 21. Discrete / Calibrated TTE Evidence

## SUPPORTING / EXPERIMENTAL

Exact discrete TTE performance was also not strong enough to promote as a headline capability.

### Exact discrete baseline vs GRU

At 60s:

- Majority exact baseline: **60.56%**
- GRU exact: **35.29%**

At 150s:

- Majority exact baseline: **60.29%**
- GRU exact: **21.43%**
- GRU ±2-window proximity: **92.86%**

Therefore exact discrete TTE is not promoted.

### Calibrated coarse range

At 60s, probability mass 0.6:

- Test coverage: **0.5882**
- Mean interval width: **12.3529s**
- Median width: **0s**

At 150s, probability mass 0.9:

- Test coverage: **0.8571**
- Mean interval width: **107.1429s**
- Median width: **120s**
- Mean miss distance: **4.2857s**

### Situational-awareness breakdown at 150s

| Split | Events | Coverage | Mean Width | Median Width |
|---|---:|---:|---:|---:|
| Train | 48 | 0.8125 | 110s | 120s |
| Validation | 6 | 1.0000 | 110s | 120s |
| Test | 14 | 0.8571 | 107.1429s | 120s |

Across all 68 events:

- NEAR_TERM: **100%**

Test set:

- 14 NEAR_TERM
- 0 IMMEDIATE
- 0 SHORT_TERM

### Dashboard rule

These ranges may be displayed as:

> **Experimental coarse situational-awareness range**

They must **not** be displayed as an exact countdown.

---

# 22. Cross-Dataset Generalization

DRISHTI intentionally uses multiple datasets for different validation roles.

- **CIC-IDS2018:** primary attack-detection evidence
- **UNSW-NB15:** temporal-dynamics / World Model evidence
- **TON-IoT:** future attack-onset forecasting and early-warning evidence
- **CTU-42:** not used as a performance benchmark because only two onset opportunities were available

### Boundary

Do not claim zero-shot cross-dataset transfer.

The datasets support different research claims rather than a single universal benchmark.

---

# 23. Packet-Level Implementation Boundary

Current research is fundamentally **flow-based**, using packet/flow telemetry aggregates.

Do not imply that the validated notebooks already perform raw-PCAP packet parsing for every packet-level field.

Fields such as:

- TTL
- TCP window
- payload size
- fragmentation
- retransmission
- packet-level scan patterns

belong to a future or demonstration packet-level ingestion interface unless backed by an actual packet-processing pipeline.

### Current honest architecture

> **Flow-level validated research + packet-level interface / future implementation path.**

If the selection prototype shows packet-level UI elements, clearly label them as:

> **Demo / extension interface**

unless an actual packet-level pipeline has been implemented and validated.

---

# 24. Explicitly NOT Claimed

DRISHTI does **not** currently claim:

- exact continuous TTE
- exact attack countdown
- universal zero-day detection
- zero-shot cross-dataset transfer
- universal attack prediction
- causal explanations from counterfactuals
- MITRE ATT&CK as a supervised classifier
- unrestricted physical simulation of raw network traffic
- guaranteed superiority of Koopman for every forecasting horizon
- raw packet-level semantic inference from the existing flow-only research pipeline
- universal operational performance from small-sample 300s/600s TON-IoT results

---

# 25. Final Headline Numbers

These are the preferred headline numbers for the demo/PPT.

### Dataset / temporal foundation

- **9,777 CIC18 temporal windows**
- **16.23M validated CIC18 flows**

### Primary attack detector

- **PR-AUC: 0.683**
- **ROC-AUC: 0.797**

### World Model

- **20.67% lower 30s MSE than persistence**

### TON-IoT early warning

- **13/14 onset events detected**
- **92.86% event-level detection**
- **120s median warning lead**
- **300s maximum observed warning lead**

### Novelty intelligence

- **0.900 OOD confidence PR-AUC**
- **0.909 OOD entropy PR-AUC**

### Explainability

- **70% Top-1 counterfactual agreement**
- **95% Top-3 counterfactual agreement**

---

# 26. Final Demo Claim

The safest high-level description of DRISHTI is:

> **DRISHTI transforms network traffic into a temporal situational-awareness layer that detects current attack activity, models network evolution, forecasts future attack onset, identifies unfamiliar behavior, explains influential signals, and provides measurable early warning before observed attack onset.**

The strongest operational evidence is:

> **On TON-IoT, the frozen GRU-134 configuration detected 13 of 14 independent attack-onset events at a fixed 0.90 threshold over a 300-second forecasting horizon, with a median warning lead of 120 seconds.**

The primary current detection evidence is:

> **On CIC-IDS2018, the frozen temporal detector achieved PR-AUC 0.683 and ROC-AUC 0.797 on the held-out evaluation.**

The World Model evidence is:

> **On UNSW-NB15, the Koopman temporal-dynamics representation reduced 30-second prediction MSE by 20.67% relative to persistence.**

---

# 27. Research Freeze

**Research is frozen at this point.**

From here onward, this manifest is the contract between:

> **Notebook → Manifest → Dashboard → Demo Video → PPT → README → Judge Q&A**

### Rule

If a number is not in this manifest, do not casually put it on the dashboard.

If a capability is marked **experimental**, label it experimental in the UI.

If something is marked **not validated**, do not turn it into marketing language.

If a result is negative, retain it where relevant rather than silently removing it.

The next phase is implementation and presentation:

- dashboard
- deterministic demo scenario/replay
- ingestion UI
- visualization
- demo video
- PPT
- README
- final submission package

The validated research notebooks remain frozen and should not be modified merely to improve presentation results.
