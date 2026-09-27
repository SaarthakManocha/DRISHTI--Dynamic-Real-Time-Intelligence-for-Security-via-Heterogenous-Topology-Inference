import type { ForecastHorizon } from "../types";

export const frozenResults = {
  cic18: {
    windows: 9777,
    validatedFlows: "16.23M",
    detectorPrAuc: 0.683,
    detectorRocAuc: 0.796866,
  },

  worldModel: {
    persistenceMse: 1.573759,
    koopmanMse: 1.248418,
    improvement: 20.67287,
  },

  earlyWarning: {
    eventsEvaluated: 14,
    detected: 13,
    total: 14,
    detectionRate: 92.857,
    medianLeadSeconds: 120,
    meanLeadSeconds: 126.923,
    minimumLeadSeconds: 30,
    maximumLeadSeconds: 300,
  },

  tonIot: {
    rawRows: 12339021,
    windows: 13720,
    attackWindows: 7846,
    benignWindows: 5874,
    genuineOnsets: 94,
    usableHistoryOnsets: 72,
  },

  xai: {
    top1Agreement: 70,
    top3Agreement: 95,
  },

  novelty: {
    confidencePrAuc: 0.900057,
    entropyPrAuc: 0.909211,
    unseenFutureBotWindows: 684,
    highUncertaintyPercent: 55.26,
    reviewRequiredPercent: 32.6,
    confidentKnownPercent: 12.13,
  },

  forecast: {
    model: "GRU-134",

    horizons: [
      {
        seconds: 30,
        probability: 44.8,
      },
      {
        seconds: 60,
        probability: 67.2,
      },
      {
        seconds: 150,
        probability: 78.0,
      },
      {
        seconds: 300,
        probability: 100.0,
      },
      {
        seconds: 600,
        probability: 100.0,
      },
    ] as ForecastHorizon[],
  },

  tte: {
    validated: false,

    calibrated60s: {
      mass: 0.6,
      testCoverage: 0.5882,
      meanWidthSeconds: 12.3529,
      medianWidthSeconds: 0,
    },

    calibrated150s: {
      mass: 0.9,
      testCoverage: 0.8571,
      meanWidthSeconds: 107.1429,
      medianWidthSeconds: 120,
      meanMissDistanceSeconds: 4.2857,
    },
  },

  researchBoundaries: {
    exactContinuousTTE: false,
    exactDiscreteTTE: false,
    zeroShotTransfer: false,
    universalZeroDayDetection: false,
    rawPcapPipeline: false,
  },
};