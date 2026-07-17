/**
 * Generates the unified dashboard analysis prompt for the AI Orchestrator
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed structured prompt
 */
export const getAnalysisPrompt = (scenarioData) => {
  return `You are an expert Environmental Scientist, Air Quality Analyst, Meteorologist, Public Health Advisor, and Smart City Urban Planner.

Analyze the following city air quality scenario and provide actionable insights.

CITY DATA:
City: ${scenarioData.city}

AQI: ${scenarioData.aqi}
Category: ${scenarioData.category}

Temperature: ${scenarioData.temperature}°C
Humidity: ${scenarioData.humidity}%
Wind Speed: ${scenarioData.windSpeed} km/h
Pressure: ${scenarioData.pressure} hPa
Visibility: ${scenarioData.visibility} km

Pollutants:
PM2.5: ${scenarioData.pollutants?.pm25}
PM10: ${scenarioData.pollutants?.pm10}
NO2: ${scenarioData.pollutants?.no2}
SO2: ${scenarioData.pollutants?.so2}
CO: ${scenarioData.pollutants?.co}
O3: ${scenarioData.pollutants?.o3}

Pollution Sources:
Traffic: ${scenarioData.sources?.traffic}
Construction: ${scenarioData.sources?.construction}
Industry: ${scenarioData.sources?.industry}
Waste Burning: ${scenarioData.sources?.wasteBurning}

Forecast:
Tomorrow AQI: ${scenarioData.forecast?.tomorrowAQI}
Trend: ${scenarioData.forecast?.trend}

----------------------------------------------------

Perform the following tasks:
1. Analyze the current AQI level and summarize its severity.
2. Explain how the weather conditions are affecting air quality.
3. Identify the top pollution sources with a brief explanation.
4. Recommend immediate actions for municipal authorities.
5. Provide health advice for citizens.

----------------------------------------------------

IMPORTANT RESPONSE RULES
Return ONLY valid JSON.
Do NOT use Markdown.
Do NOT use headings.
Do NOT use **bold**, bullet symbols, or numbering.
Keep responses concise.

Maximum limits:
- aqiSummary: 50 words
- weatherImpact: 40 words
- pollutionReason: 60 words
- Each recommendation: 15 words maximum (provide exactly 5 recommendations)
- Each health advice: 15 words maximum (provide exactly 5 health advice items)
- majorSources: exactly 3 items

Return exactly this structure:
{
  "aqiSummary": "",
  "weatherImpact": "",
  "pollutionReason": "",
  "majorSources": [
    "",
    "",
    ""
  ],
  "recommendations": [
    "",
    "",
    "",
    "",
    ""
  ],
  "healthAdvice": [
    "",
    "",
    "",
    "",
    ""
  ]
}

Do not include any additional fields.
Do not explain the JSON.
Return only the JSON object.`;
};
