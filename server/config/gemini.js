import { GoogleGenAI } from '@google/genai';

// Initialize the Google GenAI SDK client
// It automatically retrieves the GEMINI_API_KEY environment variable if not passed,
// but we explicitly pass it for safety.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Warning: GEMINI_API_KEY environment variable is not defined.');
}

export const ai = new GoogleGenAI({ apiKey });

/**
 * Reusable helper to generate content from Gemini
 * @param {string} prompt - Prompt instruction
 * @returns {Promise<string>} Clean text response from the model
 */
export const generateAIContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || '';
  } catch (error) {
    console.error('Gemini API execution failed:', error);
    throw error;
  }
};

/**
 * Reusable helper to generate JSON structured content from Gemini
 * @param {string} prompt - Prompt instruction
 * @returns {Promise<object>} Parsed JSON response from the model
 */
export const generateJSONContent = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Gemini API JSON generation failed:', error);
    throw error;
  }
};
