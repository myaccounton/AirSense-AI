/**
 * Generates prompt for Pollution Source Agent
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed prompt
 */
export const getPollutionPrompt = (scenarioData) => {
  return `You are an expert Pollution Source Agent.
Analyze the local pollution contributors for the city of ${scenarioData.city}:
- Traffic Density/Emissions: ${scenarioData.sources?.traffic}
- Construction Dust: ${scenarioData.sources?.construction}
- Industrial Emissions: ${scenarioData.sources?.industry}
- Waste Burning: ${scenarioData.sources?.wasteBurning}

Pinpoint the primary emission sources driving the current high or moderate levels of pollution. Explain the real-world impact of these sectors on the urban atmosphere and identify key hotspots or areas of concern in a concise, structured manner.`;
};
