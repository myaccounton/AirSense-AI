import { generateAIContent } from '../../config/gemini.js';
import { getAqiPrompt } from '../../prompts/aqi.prompt.js';

/**
 * Executes the AQI Analysis Agent
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<string>} Structured text analysis
 */
export const runAqiAgent = async (scenarioData) => {
  const prompt = getAqiPrompt(scenarioData);
  return await generateAIContent(prompt);
};
