import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Fetches the mock scenario data for a specific city by loading its JSON file
 * @param {string} city - The name of the city
 * @returns {Promise<object>} The scenario details from the JSON file
 */
export const getScenarioByCity = async (city) => {
  if (!city) {
    const cityError = new Error('City not found');
    cityError.statusCode = 404;
    throw cityError;
  }

  const fileName = `${city.toLowerCase()}.json`;
  const filePath = path.join(__dirname, '../scenarios', fileName);

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file is not found, throw a custom City not found error
    if (error.code === 'ENOENT') {
      const cityError = new Error('City not found');
      cityError.statusCode = 404;
      throw cityError;
    }
    throw error;
  }
};
