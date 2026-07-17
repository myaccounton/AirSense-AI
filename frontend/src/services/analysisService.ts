/**
 * Analysis Service
 * 
 * Currently returns mock data. To connect to a real API:
 * 1. Uncomment the axios import
 * 2. Replace `return mockAnalysis` with `const { data } = await axios.get('/api/analysis'); return data;`
 */

// import axios from 'axios';
import mockAnalysis from '../data/mockAnalysis.json';
import mockReport from '../data/mockReport.json';
import type { AnalysisData, ReportData } from '../types';

// const API_BASE = '/api';

export const analysisService = {
  /** Fetch AI analysis data */
  async getAnalysis(): Promise<AnalysisData> {
    // const { data } = await axios.get(`${API_BASE}/analysis`);
    // return data;
    return mockAnalysis as AnalysisData;
  },

  /** Fetch report data */
  async getReport(): Promise<ReportData> {
    // const { data } = await axios.get(`${API_BASE}/report`);
    // return data;
    return mockReport as ReportData;
  },

  /** Generate a new report */
  async generateReport(): Promise<ReportData> {
    // const { data } = await axios.post(`${API_BASE}/report/generate`);
    // return data;
    return mockReport as ReportData;
  },
};
