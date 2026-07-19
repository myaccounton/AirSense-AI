import axios from 'axios';
import type { AnalysisData, ReportData } from '../types';

const API_BASE = '/api';

export const analysisService = {
  /** Fetch AI analysis data */
  async getAnalysis(city: string): Promise<AnalysisData> {
    const activeCity = city || 'Delhi';
    const { data } = await axios.post(`${API_BASE}/analyze`, { city: activeCity });
    return data.data; // Now directly returns the structured JSON from backend
  },

  /** Run a scenario simulation */
  async simulateScenario(city: string, action: string) {
    const activeCity = city || 'Delhi';
    const { data } = await axios.post(`${API_BASE}/simulate`, { city: activeCity, action });
    return data.data.scenarioPrediction;
  },

  /** Fetch report data */
  async getReport(city: string): Promise<ReportData> {
    const activeCity = city || 'Delhi';
    const { data } = await axios.post(`${API_BASE}/report`, { city: activeCity });
    const reportResult = data.data;

    return {
      reportId: "REP-" + Date.now(),
      ...reportResult
    };
  },

  /** Generate a new report */
  async generateReport(city: string): Promise<ReportData> {
    return this.getReport(city);
  }
};
