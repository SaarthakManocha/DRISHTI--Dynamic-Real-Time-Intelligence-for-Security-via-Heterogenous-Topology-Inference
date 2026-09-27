import type { Scenario, ScenarioConfig } from "../types";

export const scenarioConfig: Record<Scenario, ScenarioConfig> = {
  normal: {
    label: "Normal Network",
    shortLabel: "NORMAL NETWORK",
    risk: 12,
    novelty: 6,
    family: "BENIGN",
    progression: "STABLE",
  },

  attack: {
    label: "High-Risk Known Attack",
    shortLabel: "KNOWN-PATTERN ATTACK",
    risk: 98,
    novelty: 18,
    family: "INFILTRATION",
    progression: "SUSTAINED",
  },

  novel: {
    label: "Novel / Uncertain",
    shortLabel: "NOVEL / UNCERTAIN",
    risk: 71,
    novelty: 82,
    family: "UNRESOLVED",
    progression: "EMERGING",
  },
};

export const scenarioOptions: Array<{
  value: Scenario;
  label: string;
}> = [
  {
    value: "normal",
    label: scenarioConfig.normal.label,
  },
  {
    value: "attack",
    label: scenarioConfig.attack.label,
  },
  {
    value: "novel",
    label: scenarioConfig.novel.label,
  },
];