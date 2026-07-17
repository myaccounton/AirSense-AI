import Logger from '../utils/logger.js';

// Simple in-memory cache to store generated analyses by city name
// Map<String (city name), Object (analysis payload)>
const analysisCache = new Map();

/**
 * Cache service to store and retrieve AI analyses
 */
class CacheService {
  /**
   * Retrieves cached analysis for a city
   * @param {string} city - Name of the city
   * @returns {object|null} Cached analysis or null if not found
   */
  static get(city) {
    const normalizedKey = city.trim().toLowerCase();
    if (analysisCache.has(normalizedKey)) {
      Logger.info(`Cache HIT for city: ${city}`);
      return analysisCache.get(normalizedKey);
    }
    Logger.info(`Cache MISS for city: ${city}`);
    return null;
  }

  /**
   * Caches the generated analysis for a city
   * @param {string} city - Name of the city
   * @param {object} analysisData - The generated analysis data object
   */
  static set(city, analysisData) {
    const normalizedKey = city.trim().toLowerCase();
    analysisCache.set(normalizedKey, analysisData);
    Logger.info(`Cached analysis details for city: ${city}`);
  }

  /**
   * Clears the current cache (useful for testing)
   */
  static clear() {
    analysisCache.clear();
    Logger.info('In-memory cache cleared.');
  }
}

export default CacheService;
