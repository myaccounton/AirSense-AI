import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function run() {
  try {
    const list = await ai.models.list();
    console.log('Is Array?', Array.isArray(list));
    console.log('Keys:', Object.keys(list));
    if (list && Array.isArray(list.pageInternal)) {
      console.log('Supported model names:');
      list.pageInternal.forEach((m) => console.log('-', m.name));
    }
  } catch (error) {
    console.error('Failed to list models:', error);
  }
}

run();
