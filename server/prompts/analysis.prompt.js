/**
 * Generates the unified dashboard analysis prompt for the AI Orchestrator
 * @param {object} scenarioData - Environmental data of the city
 * @returns {string} Detailed structured prompt
 */
export const getAnalysisPrompt = (scenarioData) => {
  return `You are a Senior AI Environmental Scientist and Urban Planner.
Analyze the following city air quality scenario and provide an advanced, data-driven JSON response to support government decisions.

CITY DATA:
City: ${scenarioData.city}
AQI: ${scenarioData.aqi} (${scenarioData.category})
Temperature: ${scenarioData.temperature}°C
Humidity: ${scenarioData.humidity}%
Wind Speed: ${scenarioData.windSpeed} km/h
Pressure: ${scenarioData.pressure} hPa

Pollutants:
PM2.5: ${scenarioData.pollutants?.pm25}
PM10: ${scenarioData.pollutants?.pm10}
NO2: ${scenarioData.pollutants?.no2}
SO2: ${scenarioData.pollutants?.so2}
CO: ${scenarioData.pollutants?.co}
O3: ${scenarioData.pollutants?.o3}

Sources:
Traffic: ${scenarioData.sources?.traffic}
Construction: ${scenarioData.sources?.construction}
Industry: ${scenarioData.sources?.industry}

Forecast Trend: ${scenarioData.forecast?.trend}

----------------------------------------------------

Generate a structured JSON response exactly matching the schema below.
Return ONLY valid JSON. No markdown. No formatting. Do not wrap in \`\`\`json.

{
  "executiveSummary": {
    "currentAQI": ${scenarioData.aqi},
    "riskLevel": "${scenarioData.category}",
    "dominantPollutant": "[Identify dominant pollutant]",
    "overallSituation": "[2-3 sentence professional summary explaining WHY pollution is occurring]",
    "expectedTrend": "[1 sentence on what will happen next]",
    "confidenceScore": [Number 0-100]
  },
  "confidence": {
    "score": [Number 0-100],
    "dataQuality": "[High/Medium/Low]",
    "forecastReliability": "[High/Medium/Low]",
    "model": "Groq Llama-3.3-70b",
    "reason": "[1 sentence explaining confidence]"
  },
  "rootCauseAnalysis": [
    {
      "source": "[Traffic/Construction/Industry]",
      "contribution": [Percentage number],
      "evidence": ["[Point 1]", "[Point 2]", "[Point 3]"],
      "reasoning": "[1 sentence reasoning]",
      "impactLevel": "[High/Medium/Low]"
    }
  ],
  "recommendations": [
    {
      "title": "[Action title]",
      "priority": "[Critical/High/Medium/Low]",
      "estimatedAQIReduction": [Number],
      "implementationDifficulty": "[High/Medium/Low]",
      "expectedTime": "[Timeframe e.g. 2 weeks]",
      "reason": "[1 sentence reason]"
    }
  ],
  "predictionTimeline": [
    {
      "timeframe": "Now",
      "predictedAQI": [Number],
      "risk": "[Risk level]",
      "explanation": "[Short explanation]"
    },
    {
      "timeframe": "+6 Hours",
      "predictedAQI": [Number],
      "risk": "[Risk level]",
      "explanation": "[Short explanation]"
    },
    {
      "timeframe": "Tomorrow",
      "predictedAQI": [Number],
      "risk": "[Risk level]",
      "explanation": "[Short explanation]"
    },
    {
      "timeframe": "2 Days",
      "predictedAQI": [Number],
      "risk": "[Risk level]",
      "explanation": "[Short explanation]"
    },
    {
      "timeframe": "Next Week",
      "predictedAQI": [Number],
      "risk": "[Risk level]",
      "explanation": "[Short explanation]"
    }
  ],
  "citizenAdvice": [
    {
      "group": "[e.g. Senior Citizens, Asthma Patients, Cyclists, Outdoor Workers, Schools, Hospitals, Pregnant Women]",
      "risk": "[High/Medium/Low]",
      "recommendation": "[Specific advice]",
      "urgency": "[Immediate/Warning/Info]"
    }
  ]
}

RULES:
- \`rootCauseAnalysis\` must have exactly 3 items.
- \`recommendations\` must have exactly 4 items.
- \`predictionTimeline\` must have exactly 5 items (Now, +6 Hours, Tomorrow, 2 Days, Next Week).
- \`citizenAdvice\` must have exactly 7 items covering the specific groups requested.
`;
};
