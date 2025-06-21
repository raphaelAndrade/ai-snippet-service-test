import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarizeText(text: string): Promise<string> {
    const prompt = `You are a professional technical writer specialized in summarizing software-related content.
    Summarize the following snippet in **30 words or less**, focusing on clarity and key ideas:
    
    "${text}"`;
  
    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5 // opcional, ajuda a evitar variação demais
    });
  
    return res.choices[0].message.content || '';
  }