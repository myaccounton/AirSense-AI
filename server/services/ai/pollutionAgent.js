import { generateAIContent } from '../../config/gemini.js';
import { getPollutionPrompt } from '../../prompts/pollution.prompt.js';

/**
 * Executes the Pollution Source Agent
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<string>} Structured text analysis
 */
export const runPollutionAgent = async (scenarioData) => {
  const prompt = getPollutionPrompt(scenarioData);
  return await generateAIContent(prompt);
};
