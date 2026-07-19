import { useState, useEffect } from 'react';
import { aqiService } from '../services/aqiService';
import { weatherService } from '../services/weatherService';
import { analysisService } from '../services/analysisService';
import type { AQIData, WeatherData, AnalysisData, ReportData } from '../types';

// Session-level caches to prevent duplicate Groq API requests on page navigation
const analysisCache: Record<string, AnalysisData> = {};
const reportCache: Record<string, ReportData> = {};

/**
 * Custom hook to manage dynamic scenario and deferred AI analysis fetching
 * @param {string} city - The current active city
 */
export function useMockData(city?: string) {
  const activeCity = city || localStorage.getItem('selectedCity') || 'Delhi';
  
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  
  // Initially resolve analysis & report from cache if they exist
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(
    analysisCache[activeCity.toLowerCase()] || null
  );
  const [reportData, setReportData] = useState<ReportData | null>(
    reportCache[activeCity.toLowerCase()] || null
  );

  const [loading, setLoading] = useState(true);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load basic scenario statistics when the city parameter changes
  useEffect(() => {
    async function fetchScenario() {
      try {
        setLoading(true);
        setError(null);

        // Fetch basic environmental AQI and weather stats (DO NOT call Groq here)
        const [aqi, weather] = await Promise.all([
          aqiService.getAQIData(activeCity),
          weatherService.getWeatherData(activeCity)
        ]);

        setAqiData(aqi);
        setWeatherData(weather);

        // Refresh analysis/report states from session caches
        const cacheKey = activeCity.toLowerCase();
        setAnalysisData(analysisCache[cacheKey] || null);
        setReportData(reportCache[cacheKey] || null);

      } catch (err) {
        console.error('Failed to load city scenario:', err);
        setError(err instanceof Error ? err.message : 'Failed to connect to backend scenario service');
      } finally {
        setLoading(false);
      }
    }

    fetchScenario();
  }, [activeCity]);

  /**
   * Triggers the Groq orchestrator to run deep pollution analysis for the city
   */
  const analyzeWithAI = async () => {
    const cacheKey = activeCity.toLowerCase();
    
    // Temporarily disabled cache for fresh AI responses
    // if (analysisCache[cacheKey]) {
    //   setAnalysisData(analysisCache[cacheKey]);
    //   setReportData(reportCache[cacheKey]);
    //   return;
    // }

    try {
      setGeneratingAI(true);
      setError(null);

      // Fire parallel requests to populate both analysis and report structures
      const [analysis, report] = await Promise.all([
        analysisService.getAnalysis(activeCity),
        analysisService.getReport(activeCity)
      ]);

      // Cache completed payloads in session variables
      analysisCache[cacheKey] = analysis;
      reportCache[cacheKey] = report;

      setAnalysisData(analysis);
      setReportData(report);
    } catch (err) {
      console.error('Groq analysis failed:', err);
      setError(err instanceof Error ? err.message : 'AI Analysis request failed.');
    } finally {
      setGeneratingAI(false);
    }
  };

  return {
    aqiData,
    weatherData,
    analysisData,
    reportData,
    loading,
    generatingAI,
    error,
    analyzeWithAI
  };
}
