import { generateAIContent } from '../../config/groq.js';
import { getHealthPrompt } from '../../prompts/health.prompt.js';

/**
 * Executes the Citizen Health Agent
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<string>} Structured text health advice
 */
export const runHealthAgent = async (scenarioData) => {
  const prompt = getHealthPrompt(scenarioData);
  return await generateAIContent(prompt);
};
