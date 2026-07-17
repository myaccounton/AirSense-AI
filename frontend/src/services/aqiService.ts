import axios from 'axios';
import type { AQIData } from '../types';

const API_BASE = '/api';

export const aqiService = {
  /** Fetch all AQI data including current, forecast, trends, and map locations */
  async getAQIData(city: string): Promise<AQIData> {
    const activeCity = city || 'Delhi';
    const { data } = await axios.get(`${API_BASE}/scenario/${activeCity}`);
    const scenario = data.data;

    return {
      current: {
        aqi: scenario.aqi,
        category: scenario.category,
        dominantPollutant: 'PM2.5',
        lastUpdated: new Date().toISOString(),
        pollutants: {
          pm25: scenario.pollutants?.pm25 || 0,
          pm10: scenario.pollutants?.pm10 || 0,
          no2: scenario.pollutants?.no2 || 0,
          co: scenario.pollutants?.co || 0,
          so2: scenario.pollutants?.so2 || 0,
          o3: scenario.pollutants?.o3 || 0
        }
      },
      forecast: [
        { hour: "6 AM", aqi: Math.max(0, Math.round(scenario.aqi * 0.85)) },
        { hour: "8 AM", aqi: Math.max(0, Math.round(scenario.aqi * 0.9)) },
        { hour: "10 AM", aqi: Math.max(0, Math.round(scenario.aqi * 0.95)) },
        { hour: "12 PM", aqi: scenario.aqi },
        { hour: "2 PM", aqi: Math.max(0, Math.round(scenario.aqi * 1.05)) },
        { hour: "4 PM", aqi: Math.max(0, Math.round(scenario.aqi * 1.1)) },
        { hour: "6 PM", aqi: scenario.forecast?.tomorrowAQI || Math.max(0, Math.round(scenario.aqi * 1.15)) },
        { hour: "8 PM", aqi: Math.max(0, Math.round(scenario.aqi * 1.02)) },
        { hour: "10 PM", aqi: Math.max(0, Math.round(scenario.aqi * 0.98)) }
      ],
      trends: {
        aqi: [
          { date: "Jul 11", value: Math.max(0, Math.round(scenario.aqi * 0.8)) },
          { date: "Jul 12", value: Math.max(0, Math.round(scenario.aqi * 0.85)) },
          { date: "Jul 13", value: Math.max(0, Math.round(scenario.aqi * 0.9)) },
          { date: "Jul 14", value: Math.max(0, Math.round(scenario.aqi * 0.93)) },
          { date: "Jul 15", value: Math.max(0, Math.round(scenario.aqi * 0.96)) },
          { date: "Jul 16", value: Math.max(0, Math.round(scenario.aqi * 0.98)) },
          { date: "Jul 17", value: scenario.aqi }
        ],
        pm25: [
          { date: "Jul 11", value: Math.max(0, Math.round(scenario.pollutants?.pm25 * 0.8)) },
          { date: "Jul 12", value: Math.max(0, Math.round(scenario.pollutants?.pm25 * 0.85)) },
          { date: "Jul 13", value: Math.max(0, Math.round(scenario.pollutants?.pm25 * 0.9)) },
          { date: "Jul 14", value: Math.max(0, Math.round(scenario.pollutants?.pm25 * 0.93)) },
          { date: "Jul 15", value: Math.max(0, Math.round(scenario.pollutants?.pm25 * 0.96)) },
          { date: "Jul 16", value: Math.max(0, Math.round(scenario.pollutants?.pm25 * 0.98)) },
          { date: "Jul 17", value: scenario.pollutants?.pm25 }
        ],
        pm10: [
          { date: "Jul 11", value: Math.max(0, Math.round(scenario.pollutants?.pm10 * 0.8)) },
          { date: "Jul 12", value: Math.max(0, Math.round(scenario.pollutants?.pm10 * 0.85)) },
          { date: "Jul 13", value: Math.max(0, Math.round(scenario.pollutants?.pm10 * 0.9)) },
          { date: "Jul 14", value: Math.max(0, Math.round(scenario.pollutants?.pm10 * 0.93)) },
          { date: "Jul 15", value: Math.max(0, Math.round(scenario.pollutants?.pm10 * 0.96)) },
          { date: "Jul 16", value: Math.max(0, Math.round(scenario.pollutants?.pm10 * 0.98)) },
          { date: "Jul 17", value: scenario.pollutants?.pm10 }
        ],
        no2: [
          { date: "Jul 11", value: Math.max(0, Math.round(scenario.pollutants?.no2 * 0.8)) },
          { date: "Jul 12", value: Math.max(0, Math.round(scenario.pollutants?.no2 * 0.85)) },
          { date: "Jul 13", value: Math.max(0, Math.round(scenario.pollutants?.no2 * 0.9)) },
          { date: "Jul 14", value: Math.max(0, Math.round(scenario.pollutants?.no2 * 0.93)) },
          { date: "Jul 15", value: Math.max(0, Math.round(scenario.pollutants?.no2 * 0.96)) },
          { date: "Jul 16", value: Math.max(0, Math.round(scenario.pollutants?.no2 * 0.98)) },
          { date: "Jul 17", value: scenario.pollutants?.no2 }
        ]
      },
      mapLocations: [
        {
          id: 1,
          name: `${scenario.city} Center`,
          lat: scenario.latitude || 28.6139,
          lng: scenario.longitude || 77.209,
          aqi: scenario.aqi,
          pollutant: "PM2.5",
          status: scenario.category,
          color: scenario.aqi > 300 ? "#ef4444" : scenario.aqi > 200 ? "#f97316" : "#eab308"
        }
      ]
    };
  },

  /** Fetch current AQI only */
  async getCurrentAQI(city: string): Promise<AQIData['current']> {
    const data = await this.getAQIData(city);
    return data.current;
  },

  /** Fetch AQI forecast */
  async getForecast(city: string): Promise<AQIData['forecast']> {
    const data = await this.getAQIData(city);
    return data.forecast;
  },

  /** Fetch map locations */
  async getMapLocations(city: string): Promise<AQIData['mapLocations']> {
    const data = await this.getAQIData(city);
    return data.mapLocations;
  },
};
