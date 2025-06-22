// src/services/gemini.service.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function summarizeText(text: string): Promise<string> {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-pro' });
  const prompt = `
You are a professional technical writer specialized in summarizing software-related content.
Summarize the following snippet in **30 words or less**, focusing on clarity and key ideas:

"${text}"
`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text().trim();
}

export async function* streamSummary(text: string) {
    try {
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-pro'});
  
      const result = await model.generateContentStream([
        {
          text: `Summarize the following content in a clear and concise paragraph:\n\n"${text}"`,
        },
      ]);
  
      for await (const chunk of result.stream) {
        const part = chunk.text();
        if (part) yield part;
      }
    } catch (err) {
      console.error('Gemini streaming error:', err);
      throw err;
    }
  }
