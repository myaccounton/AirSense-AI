/**
 * Generates prompt for Weather Intelligence Agent
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed prompt
 */
export const getWeatherPrompt = (scenarioData) => {
  return `You are an expert Weather Intelligence Agent.
Analyze the meteorological parameters for the city of ${scenarioData.city} and how they influence local air quality:
- Temperature: ${scenarioData.temperature}°C
- Humidity: ${scenarioData.humidity}%
- Wind Speed: ${scenarioData.windSpeed} km/h
- Atmospheric Pressure: ${scenarioData.pressure} hPa
- Visibility: ${scenarioData.visibility} km
- Current AQI: ${scenarioData.aqi}

Explain how these weather conditions affect pollutant concentration or dispersion (e.g., how high humidity traps particles, how wind speed disperses smog, or pressure/temperature effects). Keep your analysis professional and concise.`;
};
