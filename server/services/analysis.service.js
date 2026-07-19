import { getScenarioByCity } from './scenario.service.js';
import { runOrchestrator } from './orchestrator.service.js';
import CacheService from './cache.service.js';
import Logger from '../utils/logger.js';

// Store ongoing/active Groq request promises to deduplicate parallel requests
const activeRequests = new Map();

/**
 * Analyzes air quality scenario for a specific city using the AI Orchestrator with in-memory caching
 * @param {string} city - The name of the city
 * @returns {Promise<object>} The combined AI analysis results
 */
export const analyzeCity = async (city) => {
  const normalizedCity = city.trim().toLowerCase();

  // 1. Check in-memory cache to prevent duplicate Groq API calls
  const cachedAnalysis = CacheService.get(normalizedCity);
  if (cachedAnalysis) {
    return cachedAnalysis;
  }

  // 2. Coalesce concurrent requests for the same city to prevent parallel misses
  if (activeRequests.has(normalizedCity)) {
    Logger.info(`Reusing active Groq request promise for city: ${normalizedCity}`);
    return activeRequests.get(normalizedCity);
  }

  // 3. Create the request promise
  const promise = (async () => {
    try {
      // Load city scenario data
      const scenarioData = await getScenarioByCity(city);

      // Pass scenario data to AI Orchestrator and log response time
      Logger.info(`Requesting Groq analysis for: ${scenarioData.city}`);
      
      const startTime = Date.now();
      const orchestratorResult = await runOrchestrator(scenarioData);
      const endTime = Date.now();
      
      const duration = endTime - startTime;
      Logger.info(`Groq API response time for '${scenarioData.city}': ${duration}ms`);

      const finalResult = {
        city: scenarioData.city,
        state: scenarioData.state,
        ...orchestratorResult
      };

      // Save analysis details to cache
      CacheService.set(normalizedCity, finalResult);

      return finalResult;
    } finally {
      // Always cleanup the active promise once it finishes
      activeRequests.delete(normalizedCity);
    }
  })();

  activeRequests.set(normalizedCity, promise);
  return promise;
};
