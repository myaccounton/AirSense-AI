/**
 * AQI Service
 * 
 * Currently returns mock data. To connect to a real API:
 * 1. Uncomment the axios import
 * 2. Replace `return mockAQI` with `const { data } = await axios.get('/api/aqi'); return data;`
 */

// import axios from 'axios';
import mockAQI from '../data/mockAQI.json';
import type { AQIData } from '../types';

// const API_BASE = '/api';

export const aqiService = {
  /** Fetch all AQI data including current, forecast, trends, and map locations */
  async getAQIData(): Promise<AQIData> {
    // TODO: Replace with real API call
    // const { data } = await axios.get(`${API_BASE}/aqi`);
    // return data;
    return mockAQI as AQIData;
  },

  /** Fetch current AQI only */
  async getCurrentAQI(): Promise<AQIData['current']> {
    // const { data } = await axios.get(`${API_BASE}/aqi/current`);
    // return data;
    return mockAQI.current as AQIData['current'];
  },

  /** Fetch AQI forecast */
  async getForecast(): Promise<AQIData['forecast']> {
    // const { data } = await axios.get(`${API_BASE}/aqi/forecast`);
    // return data;
    return mockAQI.forecast;
  },

  /** Fetch map locations */
  async getMapLocations(): Promise<AQIData['mapLocations']> {
    // const { data } = await axios.get(`${API_BASE}/aqi/map`);
    // return data;
    return mockAQI.mapLocations as AQIData['mapLocations'];
  },
};
