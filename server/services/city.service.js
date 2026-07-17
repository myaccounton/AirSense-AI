import { getAllCities } from './dataset.service.js';

/**
 * Fetches list of supported cities dynamically from the CSV dataset
 * @returns {Promise<string[]>} List of cities
 */
export const getCities = async () => {
  return getAllCities();
};
