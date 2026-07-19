import { groq, GROQ_MODEL } from './groq.config.js';
import Logger from '../utils/logger.js';

// Fallback models to try in sequence if the primary model is unavailable on Groq
const FALLBACK_MODELS = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'];

/**
 * Maps raw Groq SDK errors to standardized Error objects with status codes and dev overrides
 * @param {Error|any} error - The original caught error
 * @param {boolean} isDev - If development mode is active
 * @returns {Error} Standardized error
 */
const classifyGroqError = (error, isDev) => {
  const errMsg = error.message || '';
  const errStr = String(error).toLowerCase();

  let message = 'AI Service unavailable.';
  let detail = errMsg || 'Groq API call encountered an unexpected failure.';
  let statusCode = 503;

  // 1. Quota Exceeded / Rate Limits (429)
  if (error.status === 429 || errMsg.includes('429') || errStr.includes('rate_limit') || errStr.includes('quota') || errStr.includes('limit exceeded')) {
    message = 'AI quota exceeded.';
    detail = 'Groq API quota or rate limit exceeded. Please try again later.';
    statusCode = 429;
  }
  // 2. Authentication (503 / 401)
  else if (error.status === 401 || error.status === 403 || errStr.includes('auth') || errStr.includes('key') || errStr.includes('unauthorized')) {
    message = 'AI Service unavailable.';
    detail = 'Authentication failed. Please verify your GROQ_API_KEY configuration.';
    statusCode = 503;
  }
  // 3. Model Not Found or Deprecated (503 / 404)
  else if (error.status === 404 || errStr.includes('model') || errStr.includes('not found') || errStr.includes('not_found')) {
    message = 'AI model unavailable.';
    detail = 'Configured model is deprecated or not found on Groq.';
    statusCode = 503;
  }
  // 4. Timeout or Network issues (503)
  else if (errStr.includes('timeout') || errStr.includes('connect') || errStr.includes('fetch') || errStr.includes('network') || errStr.includes('econnrefused')) {
    message = 'AI Service unavailable.';
    detail = 'Network timeout or connectivity issues connecting to Groq API.';
    statusCode = 503;
  }

  const mappedError = new Error(message);
  mappedError.statusCode = statusCode;
  
  // Expose details in development mode, hide in production
  mappedError.detail = isDev ? detail : 'An internal AI service error occurred.';
  return mappedError;
};

/**
 * Executes chat completion with fallback model sequence
 * @param {Array} messages - Chat messages context
 * @param {string} primaryModel - Primary model to try first
 * @param {boolean} responseJson - Require JSON format response
 * @returns {Promise<object>} response
 */
const executeWithFallback = async (messages, primaryModel, responseJson = false) => {
  let currentModel = primaryModel;
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS.filter(m => m !== primaryModel)];

  for (let i = 0; i < modelsToTry.length; i++) {
    currentModel = modelsToTry[i];
    const startTime = Date.now();
    try {
      Logger.info(`Using Groq Model: ${currentModel}`);
      
      const payload = {
        model: currentModel,
        messages: messages,
      };

      if (responseJson) {
        payload.response_format = { type: 'json_object' };
      }

      const response = await groq.chat.completions.create(payload);
      const duration = Date.now() - startTime;
      Logger.info(`Request completed. Model: ${currentModel} | Request time: ${new Date().toISOString()} | Groq response time: ${duration}ms`);
      return response;
    } catch (error) {
      const errMsg = error.message || '';
      const errStr = String(error).toLowerCase();
      const isModelError = error.status === 404 || errMsg.includes('404') || errStr.includes('not_found') || errStr.includes('model') || error.status === 503;

      if (i === modelsToTry.length - 1 || !isModelError) {
        throw error;
      }
      Logger.warn(`Model '${currentModel}' failed or is unavailable. Retrying with fallback: ${modelsToTry[i + 1]}`);
    }
  }
};

/**
 * Reusable helper to generate content from Groq with model fallback (compat wrapper)
 * @param {string} prompt - Prompt instruction
 * @returns {Promise<string>} Clean text response from the model
 */
export const generateAIContent = async (prompt) => {
  const isDev = process.env.NODE_ENV === 'development';
  try {
    const messages = [{ role: 'user', content: prompt }];
    const response = await executeWithFallback(messages, GROQ_MODEL, false);
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    Logger.error('Groq API call failed after trying all fallback models', error);
    throw classifyGroqError(error, isDev);
  }
};

/**
 * Reusable helper to generate JSON structured content from Groq with model fallback (compat wrapper)
 * @param {string} prompt - Prompt instruction
 * @returns {Promise<object>} Parsed JSON response from the model
 */
export const generateJSONContent = async (prompt) => {
  const isDev = process.env.NODE_ENV === 'development';
  try {
    const messages = [{ role: 'user', content: prompt }];
    const response = await executeWithFallback(messages, GROQ_MODEL, true);
    const content = response.choices[0]?.message?.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    Logger.error('Groq API JSON call failed after trying all fallback models', error);
    throw classifyGroqError(error, isDev);
  }
};
