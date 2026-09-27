export type Scenario = "normal" | "attack" | "novel";

export type Page =
  | "overview"
  | "representation"
  | "threat"
  | "dynamics"
  | "forecast"
  | "intelligence"
  | "replay"
  | "integrity";

export type Theme = "dark" | "light";

export type Accent = "cyan" | "violet" | "red" | "green";

export interface ScenarioConfig {
  label: string;
  shortLabel: string;
  risk: number;
  novelty: number;
  family: string;
  progression: string;
}

export interface MetricData {
  label: string;
  value: string | number;
  description: string;
  accent?: Accent;
}

export interface PipelineStage {
  label: string;
  description?: string;
}

export interface TrafficEvent {
  time: string;
  src: string;
  dst: string;
  protocol: string;
  port: string;
  packets: string;
  bytes: string;
  iat: string;
  status: string;
}

export interface ForecastHorizon {
  seconds: number;
  probability: number;
}

export interface NavItem {
  id: Page;
  label: string;
  subtitle: string;
}

export interface AppState {
  activePage: Page;
  scenario: Scenario;
  theme: Theme;
}