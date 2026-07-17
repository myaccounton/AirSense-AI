import { getScenarioByCity } from './scenario.service.js';
import { runOrchestrator } from './orchestrator.service.js';

/**
 * Analyzes air quality scenario for a specific city using the AI Orchestrator
 * @param {string} city - The name of the city
 * @returns {Promise<object>} The combined AI analysis results
 */
export const analyzeCity = async (city) => {
  // 1. Load city scenario data
  const scenarioData = await getScenarioByCity(city);

  // 2. Pass scenario data to AI Orchestrator
  const orchestratorResult = await runOrchestrator(scenarioData);

  // 3. Return combined response
  return {
    city: scenarioData.city,
    ...orchestratorResult
  };
};
