import React from "react";
import type { Scenario } from "../types";
import { scenarioOptions } from "../data/scenarios";

interface ScenarioSelectorProps {
  value: Scenario;
  onChange: (scenario: Scenario) => void;
}

export default function ScenarioSelector({
  value,
  onChange,
}: ScenarioSelectorProps) {
  return (
    <div className="scenario-selector">
      <div className="scenario-selector-label">
        DEMO SCENARIO
      </div>

      <select
        className="scenario-selector-select"
        value={value}
        onChange={(event) =>
          onChange(event.target.value as Scenario)
        }
        aria-label="Select demo scenario"
      >
        {scenarioOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="scenario-selector-note">
        Frozen evidence presentation
      </div>
    </div>
  );
}