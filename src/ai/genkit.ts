import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

/**
 * Read API key at runtime (avoid Next.js replacing missing build-time env with empty).
 * Vercel: set GEMINI_API_KEY (or GOOGLE_API_KEY) for Production + redeploy.
 */
function getGoogleAiApiKey(): string | undefined {
  return (
    process.env['GEMINI_API_KEY'] ||
    process.env['GOOGLE_API_KEY'] ||
    process.env['GOOGLE_GENAI_API_KEY']
  );
}

const apiKey = getGoogleAiApiKey();

export const ai = genkit({
  plugins: [googleAI(apiKey ? { apiKey } : {})],
  model: 'googleai/gemini-2.0-flash',
});
