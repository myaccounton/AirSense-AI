import { GoogleGenAI } from '@google/genai';
import Logger from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';

// Startup Validation
if (!apiKey) {
  Logger.warn('GEMINI_API_KEY environment variable is not defined.');
}

if (!process.env.GEMINI_MODEL) {
  Logger.info(`GEMINI_MODEL environment variable not defined. Defaulting to: ${model}`);
}

// Print startup configuration logs exactly as requested
console.log(`✓ Gemini Config Loaded\nModel: ${model}`);
Logger.info(`✓ Gemini Config Loaded | Model: ${model}`);

export const ai = new GoogleGenAI({ apiKey });
export const GEMINI_MODEL = model;
