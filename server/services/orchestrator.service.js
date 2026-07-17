import { generateJSONContent } from '../config/gemini.js';
import { getAnalysisPrompt } from '../prompts/analysis.prompt.js';

/**
 * AI Orchestrator service coordinates specialized agents
 * @param {object} scenarioData - Environmental data
 * @returns {Promise<object>} Combined structured response
 */
export const runOrchestrator = async (scenarioData) => {
  const prompt = getAnalysisPrompt(scenarioData);
  const analysisResult = await generateJSONContent(prompt);

  return {
    aqiSummary: analysisResult.aqiSummary || '',
    weatherImpact: analysisResult.weatherImpact || '',
    pollutionReason: analysisResult.pollutionReason || '',
    majorSources: analysisResult.majorSources || [],
    recommendations: analysisResult.recommendations || [],
    healthAdvice: analysisResult.healthAdvice || []
  };
};
