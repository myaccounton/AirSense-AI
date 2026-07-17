import { useState, useEffect } from 'react';
import { aqiService } from '../services/aqiService';
import { weatherService } from '../services/weatherService';
import { analysisService } from '../services/analysisService';
import type { AQIData, WeatherData, AnalysisData, ReportData } from '../types';

/**
 * Custom hook to fetch and manage all mock data.
 * Simulates a loading delay for realistic UX.
 * When switching to real APIs, the service layer handles it — no hook changes needed.
 */
export function useMockData() {
  const [aqiData, setAqiData] = useState<AQIData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Simulate network delay for realistic loading skeleton UX
        await new Promise((r) => setTimeout(r, 800));

        const [aqi, weather, analysis, report] = await Promise.all([
          aqiService.getAQIData(),
          weatherService.getWeatherData(),
          analysisService.getAnalysis(),
          analysisService.getReport(),
        ]);

        setAqiData(aqi);
        setWeatherData(weather);
        setAnalysisData(analysis);
        setReportData(report);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { aqiData, weatherData, analysisData, reportData, loading, error };
}
