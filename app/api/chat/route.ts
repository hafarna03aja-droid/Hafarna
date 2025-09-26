// app/api/chat/route.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from 'ai';

// Inisialisasi Google Generative AI client dengan API Key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Konversi pesan dari Vercel AI SDK ke format yang dimengerti Google
const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(m => m.role === 'user' || m.role === 'assistant')
    .map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
});

export async function POST(req: Request) {
  // Ekstrak `messages` dari body request
  const { messages } = await req.json();

  // Minta model Gemini untuk membuat respons streaming
  const geminiStream = await genAI
    .getGenerativeModel({ model: 'gemini-pro' })
    .generateContentStream(buildGoogleGenAIPrompt(messages));

  // Konversi output dari Google ke Vercel AI SDK-friendly stream
  const stream = GoogleGenerativeAIStream(geminiStream);

  // Kirimkan kembali stream sebagai respons
  return new StreamingTextResponse(stream);
}

// Opsional: Gunakan Edge Runtime untuk performa lebih baik
export const runtime = 'edge';