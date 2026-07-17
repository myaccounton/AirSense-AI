import { ai, GEMINI_MODEL } from './gemini.config.js';
import Logger from '../utils/logger.js';

// Fallback models to try in sequence if the primary model is unavailable
const FALLBACK_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

/**
 * Maps raw Gemini/SDK errors to standardized Error objects with status codes and dev overrides
 * @param {Error|any} error - The original caught error
 * @param {boolean} isDev - If development mode is active
 * @returns {Error} Standardized error
 */
const classifyGeminiError = (error, isDev) => {
  const errMsg = error.message || '';
  const errStr = String(error).toLowerCase();

  let message = 'AI Service unavailable.';
  let detail = errMsg || 'Gemini API call encountered an unexpected failure.';
  let statusCode = 503;

  // 1. Quota Exceeded (429)
  if (errMsg.includes('429') || errStr.includes('quota') || errStr.includes('rate limit') || errStr.includes('limit exceeded')) {
    message = 'AI quota exceeded.';
    detail = 'Google Gemini API quota or rate limit exceeded. Please try again later.';
    statusCode = 429;
  }
  // 2. Invalid API Key / Authentication (503)
  else if (
    errMsg.includes('key') || 
    errStr.includes('api_key') || 
    errMsg.includes('API_KEY_INVALID') || 
    errStr.includes('invalid key') || 
    errStr.includes('unauthorized') || 
    errStr.includes('forbidden') || 
    errMsg.includes('403') || 
    errMsg.includes('400')
  ) {
    message = 'AI Service unavailable.';
    detail = 'Authentication failed. Please verify your GEMINI_API_KEY configuration.';
    statusCode = 503;
  }
  // 3. Deprecated Model or Not Found (503)
  else if (
    errMsg.includes('404') || 
    errStr.includes('not_found') || 
    errStr.includes('not found') || 
    errStr.includes('model not found') || 
    errStr.includes('deprecated')
  ) {
    message = 'Gemini model unavailable.';
    detail = 'Configured model is deprecated or not found.';
    statusCode = 503;
  }
  // 4. Timeout or Network issues (503)
  else if (errStr.includes('timeout') || errStr.includes('connect') || errStr.includes('fetch') || errStr.includes('network') || errStr.includes('econnrefused')) {
    message = 'AI Service unavailable.';
    detail = 'Network timeout or connectivity issues connecting to Google Gemini API.';
    statusCode = 503;
  }

  const mappedError = new Error(message);
  mappedError.statusCode = statusCode;
  
  // Expose details in development mode, hide in production
  mappedError.detail = isDev ? detail : 'An internal AI service error occurred.';
  return mappedError;
};

/**
 * Executes content generation with fallback model sequence
 * @param {object} params - generateContent params
 * @param {string} primaryModel - Primary model to try first
 * @returns {Promise<object>} response
 */
const executeWithFallback = async (params, primaryModel) => {
  let currentModel = primaryModel;
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter(m => m !== primaryModel)];

  for (let i = 0; i < modelsToTry.length; i++) {
    currentModel = modelsToTry[i];
    const startTime = Date.now();
    try {
      Logger.info(`Using Gemini Model: ${currentModel}`);
      const response = await ai.models.generateContent({
        ...params,
        model: currentModel
      });
      const duration = Date.now() - startTime;
      Logger.info(`Request completed. Model: ${currentModel} | Request time: ${new Date().toISOString()} | Gemini response time: ${duration}ms`);
      return response;
    } catch (error) {
      const errMsg = error.message || '';
      const errStr = String(error).toLowerCase();
      const isModelError = errMsg.includes('404') || errStr.includes('not_found') || errStr.includes('not found') || errStr.includes('model not found') || errStr.includes('no longer available') || errMsg.includes('503');

      // If it is the last model in the chain or not a model-related error, throw it
      if (i === modelsToTry.length - 1 || !isModelError) {
        throw error;
      }
      Logger.warn(`Model '${currentModel}' failed or is unavailable. Retrying with fallback: ${modelsToTry[i + 1]}`);
    }
  }
};

/**
 * Reusable helper to generate content from Gemini with model fallback
 * @param {string} prompt - Prompt instruction
 * @returns {Promise<string>} Clean text response from the model
 */
export const generateAIContent = async (prompt) => {
  const isDev = process.env.NODE_ENV === 'development';
  try {
    const response = await executeWithFallback({ contents: prompt }, GEMINI_MODEL);
    return response.text || '';
  } catch (error) {
    Logger.error('Gemini API call failed after trying all fallback models', error);
    throw classifyGeminiError(error, isDev);
  }
};

/**
 * Reusable helper to generate JSON structured content from Gemini with model fallback
 * @param {string} prompt - Prompt instruction
 * @returns {Promise<object>} Parsed JSON response from the model
 */
export const generateJSONContent = async (prompt) => {
  const isDev = process.env.NODE_ENV === 'development';
  try {
    const response = await executeWithFallback({
      contents: prompt,
      config: { responseMimeType: 'application/json' }
    }, GEMINI_MODEL);
    return JSON.parse(response.text || '{}');
  } catch (error) {
    Logger.error('Gemini API JSON call failed after trying all fallback models', error);
    throw classifyGeminiError(error, isDev);
  }
};
