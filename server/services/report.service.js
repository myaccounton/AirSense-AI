import { getScenarioByCity } from './scenario.service.js';
import { analyzeCity } from './analysis.service.js';

/**
 * Generates a structured air quality action report for a specific city
 * @param {string} city - The name of the city
 * @returns {Promise<object>} Structured report data
 */
export const generateReport = async (city) => {
  // 1. Load city scenario
  const scenario = await getScenarioByCity(city);

  // 2. Run AI analysis (reuse existing service)
  const analysis = await analyzeCity(city);

  // 3. Generate a structured report summary
  const summary = `The air quality in ${scenario.city} is currently categorized as ${scenario.category} with an AQI of ${scenario.aqi}. Meteorology shows a temperature of ${scenario.temperature}°C, humidity of ${scenario.humidity}%, and wind speed of ${scenario.windSpeed} km/h. Key particulate counts (PM2.5: ${scenario.pollutants?.pm25} µg/m³, PM10: ${scenario.pollutants?.pm10} µg/m³) are elevated, and the short-term forecast trend is ${scenario.forecast?.trend}.`;

  return {
    title: 'Air Quality Action Report',
    city: scenario.city,
    generatedAt: new Date().toISOString(),
    summary,
    aqiSummary: analysis.aqiSummary,
    weatherImpact: analysis.weatherImpact,
    pollutionReason: analysis.pollutionReason,
    majorSources: analysis.majorSources,
    municipalRecommendations: analysis.recommendations,
    healthAdvice: analysis.healthAdvice,
    forecast: {
      tomorrowAQI: scenario.forecast?.tomorrowAQI,
      trend: scenario.forecast?.trend
    }
  };
};
