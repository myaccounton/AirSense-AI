/**
 * Weather Service
 * 
 * Currently returns mock data. To connect to a real API:
 * 1. Uncomment the axios import
 * 2. Replace `return mockWeather` with `const { data } = await axios.get('/api/weather'); return data;`
 */

// import axios from 'axios';
import mockWeather from '../data/mockWeather.json';
import type { WeatherData } from '../types';

// const API_BASE = '/api';

export const weatherService = {
  /** Fetch all weather data */
  async getWeatherData(): Promise<WeatherData> {
    // const { data } = await axios.get(`${API_BASE}/weather`);
    // return data;
    return mockWeather as WeatherData;
  },

  /** Fetch current weather */
  async getCurrentWeather(): Promise<WeatherData['current']> {
    // const { data } = await axios.get(`${API_BASE}/weather/current`);
    // return data;
    return mockWeather.current as WeatherData['current'];
  },
};
