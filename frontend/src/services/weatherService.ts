import axios from 'axios';
import type { WeatherData } from '../types';

const API_BASE = '/api';

export const weatherService = {
  /** Fetch all weather data */
  async getWeatherData(city: string): Promise<WeatherData> {
    const activeCity = city || 'Delhi';
    const { data } = await axios.get(`${API_BASE}/scenario/${activeCity}`);
    const scenario = data.data;

    return {
      current: {
        temperature: scenario.temperature,
        feelsLike: scenario.temperature + 4,
        humidity: scenario.humidity,
        windSpeed: scenario.windSpeed,
        windDirection: "NW",
        pressure: scenario.pressure || 1012,
        visibility: scenario.visibility || 5,
        uvIndex: 8,
        condition: scenario.aqi > 200 ? "Hazy" : "Clear",
        icon: scenario.aqi > 200 ? "haze" : "sunny"
      },
      forecast: scenario.weeklyRecords ? scenario.weeklyRecords.map((r: any) => ({
        day: r.date,
        high: r.temperature + 2,
        low: r.temperature - 4,
        condition: r.aqi > 200 ? "Hazy" : "Clear",
        aqi: r.aqi
      })) : []
    };
  },

  /** Fetch current weather */
  async getCurrentWeather(city: string): Promise<WeatherData['current']> {
    const data = await this.getWeatherData(city);
    return data.current;
  },
};
