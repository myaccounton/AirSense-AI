import { generateAIContent } from '../../config/gemini.js';
import { getWeatherPrompt } from '../../prompts/weather.prompt.js';

/**
 * Executes the Weather Intelligence Agent
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<string>} Structured text analysis
 */
export const runWeatherAgent = async (scenarioData) => {
  const prompt = getWeatherPrompt(scenarioData);
  return await generateAIContent(prompt);
};
