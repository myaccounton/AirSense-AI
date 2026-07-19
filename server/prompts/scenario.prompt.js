/**
 * Generates the scenario simulation prompt for the AI Orchestrator
 * @param {object} scenarioData - Baseline environmental data
 * @param {string} action - The action/scenario to simulate
 * @returns {string} Detailed structured prompt
 */
export const getScenarioPrompt = (scenarioData, action) => {
  return `You are a Senior AI Environmental Scientist and Urban Planner.
Analyze the following baseline air quality scenario and predict the future outcome if the specified ACTION is taken.

BASELINE DATA:
City: ${scenarioData.city}
AQI: ${scenarioData.aqi} (${scenarioData.category})
Temperature: ${scenarioData.temperature}°C
Wind Speed: ${scenarioData.windSpeed} km/h
Primary Pollutants: PM2.5 (${scenarioData.pollutants?.pm25}), NO2 (${scenarioData.pollutants?.no2})

ACTION TO SIMULATE:
${action}

----------------------------------------------------

Predict the outcome of this action and return ONLY valid JSON matching this schema:

{
  "scenarioPrediction": {
    "action": "${action}",
    "futureAQI": [Number representing predicted new AQI],
    "improvement": "[Short description of improvement e.g. 'Major improvement due to reduced vehicular emissions']",
    "explanation": "[Detailed 2-3 sentence reasoning of the simulated impact]"
  }
}

RULES:
- Return ONLY valid JSON.
- No markdown. No formatting. Do not wrap in \`\`\`json.
- Base your prediction logically on atmospheric science (e.g., stopping traffic reduces PM2.5 and NO2 quickly, rain washes out particulates, wind disperses them).
`;
};
