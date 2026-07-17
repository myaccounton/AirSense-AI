// ===== AQI Types =====
export type AQICategory = 'Good' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';

export interface Pollutants {
  pm25: number;
  pm10: number;
  no2: number;
  co: number;
  so2: number;
  o3: number;
}

export interface AQICurrent {
  aqi: number;
  category: AQICategory;
  dominantPollutant: string;
  lastUpdated: string;
  pollutants: Pollutants;
}

export interface ForecastPoint {
  hour: string;
  aqi: number;
}

export interface TrendPoint {
  date: string;
  value: number;
}

export interface MapLocation {
  id: number;
  name: string;
  lat: number;
  lng: number;
  aqi: number;
  pollutant: string;
  status: string;
  color: string;
}

export interface AQIData {
  current: AQICurrent;
  forecast: ForecastPoint[];
  trends: {
    aqi: TrendPoint[];
    pm25: TrendPoint[];
    pm10: TrendPoint[];
    no2: TrendPoint[];
  };
  mapLocations: MapLocation[];
}

// ===== Weather Types =====
export interface WeatherCurrent {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  pressure: number;
  visibility: number;
  uvIndex: number;
  condition: string;
  icon: string;
}

export interface WeatherForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  aqi: number;
}

export interface WeatherData {
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
}

// ===== Analysis Types =====
export interface DominantPollutant {
  name: string;
  value: number;
  limit: number;
  percentage: number;
  trend: 'rising' | 'stable' | 'falling';
}

export interface SourceAttribution {
  source: string;
  percentage: number;
  icon: string;
}

export interface RiskLevel {
  level: string;
  score: number;
  description: string;
}

export interface Recommendation {
  id: number;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  icon: string;
  impact?: string;
}

export interface HealthAdvisory {
  id: number;
  title: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  icon: string;
  forGroup: string;
}

export interface AnalysisData {
  summary: string;
  aqiIncrease: {
    reason: string;
    confidence: number;
  };
  dominantPollutants: DominantPollutant[];
  sourceAttribution: SourceAttribution[];
  riskLevel: RiskLevel;
  municipalRecommendations: Recommendation[];
  healthAdvisory: HealthAdvisory[];
}

// ===== Report Types =====
export interface ReportSection {
  title: string;
  description: string;
  [key: string]: unknown;
}

export interface ReportData {
  reportId: string;
  generatedAt: string;
  city: string;
  region: string;
  period: string;
  sections: {
    currentAQI: ReportSection & { aqi: number; category: string };
    forecast: ReportSection & { peakAQI: number; peakTime: string; values: number[] };
    analysis: ReportSection & { topSources: string[] };
    municipal: ReportSection & { actions: string[] };
    health: ReportSection & { advisories: string[] };
  };
}
