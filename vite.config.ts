import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {GoogleGenAI} from '@google/genai';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'gemini-evaluator-api',
        configureServer(server) {
          server.middlewares.use('/api/ask-evaluator', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.end('Method Not Allowed');
              return;
            }

            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const {question, mode, context} = JSON.parse(body || '{}');
                const apiKey = process.env.GEMINI_API_KEY;

                if (!apiKey) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error: 'GEMINI_API_KEY is not configured in secrets.',
                    }),
                  );
                  return;
                }

                const ai = new GoogleGenAI({
                  apiKey,
                  httpOptions: {
                    headers: {
                      'User-Agent': 'aistudio-build',
                    },
                  },
                });

                const systemInstruction = `You are an expert Startup Pitch Evaluator, VC Investor, Hackathon Jury, and Pitch Coach.
You have the complete transcript and context of the startup pitch for FINNA (The AI Financial Co-Pilot for Gig Workers / "Finance Anna").
Presenters: Aswin & Co-founder from RIT Chennai.
Product: FINNA - Personal finance advisory app for gig workers (Swiggy, Zomato, Urban Company), using bank statements & RBI Account Aggregator to generate a Safe Score / Confidence Meter, vernacular voice alerts, and monetizing via affiliate referral commissions for credit cards, insurance, and personal loans (B2B2C).
Competitors analyzed: KarmaLife (credit lines) and PayNearby / Penoma (insurance & loans).
Market: 7.7M gig workers in India -> 23.5M by 2030 (NITI Aayog).

Answer the user's questions adhering strictly to these rules:
1. Ground your answers in the exact pitch transcript and video context.
2. Structure your response with:
   - **Short Answer**
   - **What My Pitch Says** (what was actually stated in Tamil/English)
   - **Evaluator's View** (brutal VC/Jury critique)
   - **What I Should Answer** (high-impact, truthful response founders should give)
   - **Potential Follow-up Question**
3. If something was NOT in the pitch, explicitly say "Not mentioned in the pitch." Never hallucinate facts.
4. Keep tone professional, candid, constructive, and investor-grade.`;

                const prompt = `User Question / Pitch Scenario: "${question}"
Mode / Focus: ${mode || 'Jury Advisor'}
Extra Context: ${context || 'General FINNA pitch context'}

Provide a structured, rigorous evaluation response.`;

                const response = await ai.models.generateContent({
                  model: 'gemini-3.7-flash',
                  contents: prompt,
                  config: {
                    systemInstruction,
                  },
                });

                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    text: response.text || 'No response generated.',
                  }),
                );
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    error: err.message || 'Internal server error',
                  }),
                );
              }
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
