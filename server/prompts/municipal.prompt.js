/**
 * Generates prompt for Municipal Recommendation Agent
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed prompt
 */
export const getMunicipalPrompt = (scenarioData) => {
  return `You are a Smart City Urban Planner and Municipal Policy Agent.
Given the current air quality metrics for ${scenarioData.city}:
- AQI: ${scenarioData.aqi} (${scenarioData.category})
- Main Sources: Traffic (${scenarioData.sources?.traffic}), Construction (${scenarioData.sources?.construction}), Industry (${scenarioData.sources?.industry}), Waste Burning (${scenarioData.sources?.wasteBurning})

Recommend 3 to 4 actionable, specific municipal regulations or short-term emergency policies to mitigate air pollution (e.g., restricted traffic zones, temporary construction bans, industrial emission caps, road-wetting, or public transit incentives). Present these in a concise, authoritative format.`;
};
