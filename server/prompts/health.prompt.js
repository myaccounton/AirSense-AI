/**
 * Generates prompt for Citizen Health Agent
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed prompt
 */
export const getHealthPrompt = (scenarioData) => {
  return `You are a Public Health Officer and Medical Advisor.
Given the current air quality metrics for ${scenarioData.city}:
- AQI: ${scenarioData.aqi} (${scenarioData.category})
- PM2.5: ${scenarioData.pollutants?.pm25} µg/m³
- PM10: ${scenarioData.pollutants?.pm10} µg/m³

Provide clear, empathetic, and actionable health advisories for the general public, sensitive groups (children, elderly, asthmatics), and outdoor workers. Discuss protective gear, usage of air purifiers, and limitations on outdoor physical activity. Keep it concise.`;
};
