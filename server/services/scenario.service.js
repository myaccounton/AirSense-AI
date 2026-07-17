import { getLatestScenario } from './dataset.service.js';

/**
 * Fetches the scenario data for a specific city from the CSV dataset
 * @param {string} city - The name of the city
 * @returns {Promise<object>} The scenario details
 */
export const getScenarioByCity = async (city) => {
  // getLatestScenario will validate the city name and throw a 404/400 if invalid/missing
  return getLatestScenario(city);
};
