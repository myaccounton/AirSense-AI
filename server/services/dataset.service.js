import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import { fileURLToPath } from 'url';
import Logger from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for CSV dataset rows
let dataset = [];

/**
 * Parses date string in "DD-MM-YYYY" format to JS Date object
 * @param {string} dateStr 
 * @returns {Date}
 */
const parseCSVDate = (dateStr) => {
  if (!dateStr) return new Date(0);
  const parts = dateStr.trim().split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // 0-indexed month
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(0);
};

/**
 * Maps a raw CSV row object to the structured AirSense scenario schema
 * @param {object} row - Raw CSV row
 * @returns {object} Standardized scenario data
 */
const mapRowToScenario = (row) => {
  const aqi = parseInt(row.AQI, 10) || 0;

  // Calculate AQI category standard ranges
  let category = 'Moderate';
  if (aqi <= 50) category = 'Good';
  else if (aqi <= 100) category = 'Satisfactory';
  else if (aqi <= 200) category = 'Moderate';
  else if (aqi <= 300) category = 'Poor';
  else if (aqi <= 400) category = 'Very Poor';
  else category = 'Severe';

  return {
    city: row.City,
    aqi: aqi,
    category: category,
    temperature: parseInt(row.Temperature, 10) || 25,
    humidity: parseInt(row.Humidity, 10) || 50,
    windSpeed: parseInt(row.WindSpeed, 10) || 10,
    pressure: parseInt(row.Pressure, 10) || 1012,
    visibility: parseInt(row.Visibility, 10) || 5,
    latitude: parseFloat(row.Latitude) || 28.6139,
    longitude: parseFloat(row.Longitude) || 77.209,
    pollutants: {
      pm25: parseInt(row['PM2.5'], 10) || 0,
      pm10: parseInt(row.PM10, 10) || 0,
      no2: parseInt(row.NO2, 10) || 0,
      so2: 12, // Default standard values for missing columns
      co: parseFloat(row.CO) || 0.0,
      o3: 20  // Default standard values for missing columns
    },
    sources: {
      traffic: row.Traffic || 'Low',
      construction: row.ConstructionActivity || 'Low',
      industry: row.IndustrialActivity || 'Low',
      wasteBurning: 'Low' // Default mock value
    },
    forecast: {
      tomorrowAQI: aqi + (row.Hotspot === 'TRUE' ? 12 : -4),
      trend: row.Hotspot === 'TRUE' ? 'Increasing' : 'Decreasing'
    }
  };
};

/**
 * Loads the CSV dataset file into memory. Returns stats on records loaded.
 * @returns {Promise<object>} Stats on records loaded.
 */
export const loadDataset = () => {
  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/environmental_scenarios_dataset.csv');
    const parsedRows = [];

    if (!fs.existsSync(csvPath)) {
      const err = new Error(`CSV file missing at: ${csvPath}`);
      err.statusCode = 500;
      return reject(err);
    }

    fs.createReadStream(csvPath)
      .pipe(csvParser())
      .on('data', (data) => {
        parsedRows.push(data);
      })
      .on('end', () => {
        dataset = parsedRows;
        
        // Find unique cities
        const uniqueCities = new Set(dataset.map(row => row.City).filter(Boolean));
        
        Logger.info(`✓ Dataset Loaded | Total Records: ${dataset.length} | Cities: ${uniqueCities.size}`);
        
        resolve({
          totalRecords: dataset.length,
          cityCount: uniqueCities.size
        });
      })
      .on('error', (error) => {
        Logger.error('CSV Parsing failed', error);
        const err = new Error('CSV parsing failure');
        err.statusCode = 500;
        reject(err);
      });
  });
};

/**
 * Returns all unique city names from the dataset sorted alphabetically
 * @returns {string[]} Unique city list
 */
export const getAllCities = () => {
  if (!dataset || dataset.length === 0) {
    const err = new Error('Empty dataset');
    err.statusCode = 500;
    throw err;
  }
  const citiesSet = new Set(dataset.map(row => row.City).filter(Boolean));
  return Array.from(citiesSet).sort((a, b) => a.localeCompare(b));
};

/**
 * Returns all records matching the city name (case-insensitive)
 * @param {string} city - Name of the city
 * @returns {object[]} Records array
 */
export const getScenarioByCity = (city) => {
  if (!city) {
    const err = new Error('City parameter is required');
    err.statusCode = 400;
    throw err;
  }
  if (!dataset || dataset.length === 0) {
    const err = new Error('Empty dataset');
    err.statusCode = 500;
    throw err;
  }

  const query = city.trim().toLowerCase();
  const records = dataset.filter(row => row.City && row.City.toLowerCase() === query);

  if (records.length === 0) {
    const err = new Error('City not found');
    err.statusCode = 404;
    throw err;
  }

  return records;
};

/**
 * Filters rows for a city and returns the latest record resolved by Date (DD-MM-YYYY)
 * @param {string} city - Name of the city
 * @returns {object} Standardized latest scenario data
 */
export const getLatestScenario = (city) => {
  const cityRecords = getScenarioByCity(city);

  // Sort city records by date descending
  const sortedRecords = [...cityRecords].sort((a, b) => {
    const dateA = parseCSVDate(a.Date);
    const dateB = parseCSVDate(b.Date);
    return dateB - dateA;
  });

  const latestRecord = sortedRecords[0];
  return mapRowToScenario(latestRecord);
};
