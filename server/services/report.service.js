import { getScenarioByCity } from './scenario.service.js';
import { analyzeCity } from './analysis.service.js';

/**
 * Generates a structured air quality action report for a specific city
 * @param {string} city - The name of the city
 * @returns {Promise<object>} Structured report data
 */
export const generateReport = async (city) => {
  // 1. Load city scenario
  const scenario = await getScenarioByCity(city);

  // 2. Run AI analysis (reuse existing service)
  const analysis = await analyzeCity(city);

  return {
    title: 'Air Quality Action Report',
    city: scenario.city,
    state: scenario.state,
    generatedAt: new Date().toISOString(),
    executiveSummary: analysis.executiveSummary,
    confidence: analysis.confidence,
    rootCauseAnalysis: analysis.rootCauseAnalysis,
    recommendations: analysis.recommendations,
    predictionTimeline: analysis.predictionTimeline,
    citizenAdvice: analysis.citizenAdvice,
    forecast: {
      tomorrowAQI: scenario.forecast?.tomorrowAQI,
      trend: scenario.forecast?.trend
    }
  };
};
