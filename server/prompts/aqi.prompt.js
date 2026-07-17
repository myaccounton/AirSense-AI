/**
 * Generates prompt for AQI Analysis Agent
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed prompt
 */
export const getAqiPrompt = (scenarioData) => {
  return `You are an expert AQI Analysis Agent for a Smart City Air Quality Platform.
Analyze the following air quality scenario data for the city of ${scenarioData.city}:
- AQI: ${scenarioData.aqi} (${scenarioData.category})
- PM2.5: ${scenarioData.pollutants?.pm25} µg/m³
- PM10: ${scenarioData.pollutants?.pm10} µg/m³
- NO2: ${scenarioData.pollutants?.no2} ppb
- SO2: ${scenarioData.pollutants?.so2} ppb
- CO: ${scenarioData.pollutants?.co} ppm
- O3: ${scenarioData.pollutants?.o3} ppb

Provide a professional, concise summary of the overall air quality status. Discuss which pollutants are the primary drivers of the AQI, how they compare to safe limits, and the short-term forecast trend (Tomorrow's Forecast AQI: ${scenarioData.forecast?.tomorrowAQI}, Trend: ${scenarioData.forecast?.trend}).`;
};
