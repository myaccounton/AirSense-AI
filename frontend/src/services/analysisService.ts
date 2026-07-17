import axios from 'axios';
import type { AnalysisData, ReportData } from '../types';

const API_BASE = '/api';

export const analysisService = {
  /** Fetch AI analysis data */
  async getAnalysis(city: string): Promise<AnalysisData> {
    const activeCity = city || 'Delhi';
    const { data } = await axios.post(`${API_BASE}/analyze`, { city: activeCity });
    const analysis = data.data;

    return {
      summary: analysis.aqiSummary,
      aqiIncrease: {
        reason: analysis.pollutionReason,
        confidence: 94
      },
      dominantPollutants: [
        { name: "PM2.5", value: 177, limit: 15, percentage: 1180, trend: "rising" }
      ],
      sourceAttribution: analysis.majorSources.map((source: string, index: number) => ({
        source,
        percentage: index === 0 ? 50 : index === 1 ? 30 : 20,
        icon: "industry"
      })),
      riskLevel: {
        level: analysis.aqiSummary.toLowerCase().includes("very poor") || analysis.aqiSummary.toLowerCase().includes("severe") ? "High" : "Medium",
        score: analysis.aqiSummary.toLowerCase().includes("very poor") || analysis.aqiSummary.toLowerCase().includes("severe") ? 88 : 65,
        description: "Elevated particulate pollution risk."
      },
      municipalRecommendations: analysis.recommendations.map((rec: string, index: number) => ({
        id: index + 1,
        title: `Action Item ${index + 1}`,
        description: rec,
        priority: "Critical",
        icon: "shield"
      })),
      healthAdvisory: analysis.healthAdvice.map((adv: string, index: number) => ({
        id: index + 1,
        title: `Advisory ${index + 1}`,
        description: adv,
        priority: "High",
        icon: "heart",
        forGroup: "General Public"
      }))
    };
  },

  /** Fetch report data */
  async getReport(city: string): Promise<ReportData> {
    const activeCity = city || 'Delhi';
    const { data } = await axios.post(`${API_BASE}/report`, { city: activeCity });
    const reportResult = data.data;

    return {
      reportId: "REP-" + Date.now(),
      generatedAt: reportResult.generatedAt,
      city: reportResult.city,
      region: "Delhi NCR",
      period: "Current Scenario",
      sections: {
        currentAQI: {
          title: "Current Air Quality Summary",
          description: reportResult.summary,
          aqi: reportResult.forecast?.tomorrowAQI || 0,
          category: reportResult.forecast?.trend || "Stable"
        },
        forecast: {
          title: "Short-term Forecast",
          description: reportResult.weatherImpact,
          peakAQI: reportResult.forecast?.tomorrowAQI || 0,
          peakTime: "Tomorrow",
          values: [reportResult.forecast?.tomorrowAQI || 0]
        },
        analysis: {
          title: "Pollution Source Analysis",
          description: reportResult.pollutionReason,
          topSources: reportResult.majorSources
        },
        municipal: {
          title: "Municipal Actions Requisitions",
          description: reportResult.aqiSummary,
          actions: reportResult.municipalRecommendations
        },
        health: {
          title: "Citizen Health Advisory",
          description: reportResult.healthAdvice.join(". "),
          advisories: reportResult.healthAdvice
        }
      }
    };
  },

  /** Generate a new report */
  async generateReport(city: string): Promise<ReportData> {
    return this.getReport(city);
  },
};
