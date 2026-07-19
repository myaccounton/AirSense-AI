import { generateAIContent } from '../../config/groq.js';
import { getMunicipalPrompt } from '../../prompts/municipal.prompt.js';

/**
 * Executes the Municipal Recommendation Agent
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<string>} Structured text recommendations
 */
export const runMunicipalAgent = async (scenarioData) => {
  const prompt = getMunicipalPrompt(scenarioData);
  return await generateAIContent(prompt);
};
