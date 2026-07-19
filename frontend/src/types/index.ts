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
  riskZone: string;
  hotspot: string;
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

// ===== Analysis Types (Production AI Support) =====

export interface ExecutiveSummary {
  currentAQI: number;
  riskLevel: string;
  dominantPollutant: string;
  overallSituation: string;
  expectedTrend: string;
  confidenceScore: number;
}

export interface ConfidenceScore {
  score: number;
  dataQuality: string;
  forecastReliability: string;
  model: string;
  reason: string;
}

export interface RootCause {
  source: string;
  contribution: number;
  evidence: string[];
  reasoning: string;
  impactLevel: string;
}

export interface RecommendationImpact {
  title: string;
  priority: string;
  estimatedAQIReduction: number;
  implementationDifficulty: string;
  expectedTime: string;
  reason: string;
}

export interface TimelinePrediction {
  timeframe: string;
  predictedAQI: number;
  risk: string;
  explanation: string;
}

export interface CitizenAdvisory {
  group: string;
  risk: string;
  recommendation: string;
  urgency: string;
}

export interface AnalysisData {
  city?: string;
  state?: string;
  executiveSummary: ExecutiveSummary;
  confidence: ConfidenceScore;
  rootCauseAnalysis: RootCause[];
  recommendations: RecommendationImpact[];
  predictionTimeline: TimelinePrediction[];
  citizenAdvice: CitizenAdvisory[];
}

export interface ScenarioPrediction {
  action: string;
  futureAQI: number;
  improvement: string;
  explanation: string;
}

export interface ReportData extends AnalysisData {
  reportId: string;
  generatedAt: string;
  city: string;
  region: string;
  period: string;
  forecast?: {
    tomorrowAQI: number;
    trend: string;
  };
}
