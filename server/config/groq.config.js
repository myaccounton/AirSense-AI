import Groq from 'groq-sdk';
import Logger from '../utils/logger.js';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GROQ_API_KEY;
const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Startup Validation
if (!apiKey) {
  Logger.warn('GROQ_API_KEY environment variable is not defined.');
}

console.log(`✓ Groq Config Loaded\nModel: ${model}`);
Logger.info(`✓ Groq Config Loaded | Model: ${model}`);

export const groq = new Groq({ apiKey });
export const GROQ_MODEL = model;
