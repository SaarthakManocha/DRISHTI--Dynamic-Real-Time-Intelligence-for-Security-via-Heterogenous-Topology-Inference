import React from "react";
import type { PipelineStage } from "../types";

interface PipelineProps {
  stages: PipelineStage[];
  activeIndex?: number;
  completedThrough?: number;
}

export default function Pipeline({
  stages,
  activeIndex = -1,
  completedThrough = -1,
}: PipelineProps) {
  return (
    <div className="pipeline">
      {stages.map((stage, index) => {
        const isActive = index === activeIndex;
        const isCompleted = index <= completedThrough;

        return (
          <React.Fragment key={stage.label}>
            <div
              className={[
                "pipeline-stage",
                isActive ? "pipeline-stage-active" : "",
                isCompleted ? "pipeline-stage-completed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="pipeline-node">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="pipeline-stage-content">
                <div className="pipeline-stage-label">{stage.label}</div>

                {stage.description && (
                  <div className="pipeline-stage-description">
                    {stage.description}
                  </div>
                )}
              </div>
            </div>

            {index < stages.length - 1 && (
              <div
                className={[
                  "pipeline-connector",
                  index === stages.length - 2 ? "pipeline-connector-final" : "",
                  index < completedThrough
                    ? "pipeline-connector-completed"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}