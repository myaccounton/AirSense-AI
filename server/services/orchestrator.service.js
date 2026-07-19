import { generateJSONContent } from '../config/groq.js';
import { getAnalysisPrompt } from '../prompts/analysis.prompt.js';

/**
 * AI Orchestrator service coordinates specialized agents
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<object>} Combined structured response
 */
export const runOrchestrator = async (scenarioData) => {
  const prompt = getAnalysisPrompt(scenarioData);
  const analysisResult = await generateJSONContent(prompt);
  return analysisResult;
};

export const runSimulation = async (scenarioData, action) => {
  const prompt = await import('../prompts/scenario.prompt.js').then(m => m.getScenarioPrompt(scenarioData, action));
  const simulationResult = await generateJSONContent(prompt);
  return simulationResult;
};
