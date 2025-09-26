import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("Variabel lingkungan API_KEY tidak diatur");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    topic: {
        type: Type.STRING,
        description: "Topik atau produk asli yang dianalisis."
    },
    summary: {
      type: Type.STRING,
      description: "Ringkasan singkat 1-2 paragraf dari sentimen pasar secara keseluruhan dan temuan utama.",
    },
    keyTrends: {
      type: Type.ARRAY,
      description: "Daftar 3-5 tren utama yang muncul yang diidentifikasi dari data.",
      items: { type: Type.STRING },
    },
    consumerComplaints: {
      type: Type.ARRAY,
      description: "Daftar 3-5 keluhan umum atau masalah yang disebutkan oleh konsumen.",
      items: { type: Type.STRING },
    },
    productOpportunities: {
      type: Type.ARRAY,
      description: "Daftar 3-5 ide produk baru atau perbaikan fitur potensial berdasarkan analisis.",
      items: { type: Type.STRING },
    },
    sentimentAnalysis: {
      type: Type.OBJECT,
      description: "Rincian sentimen pasar menjadi persentase positif, negatif, dan netral. Total persentase harus 100.",
      properties: {
        positive: { type: Type.NUMBER, description: "Persentase sentimen positif (0-100)." },
        negative: { type: Type.NUMBER, description: "Persentase sentimen negatif (0-100)." },
        neutral: { type: Type.NUMBER, description: "Persentase sentimen netral (0-100)." },
      },
    },
  },
  required: ["topic", "summary", "keyTrends", "consumerComplaints", "productOpportunities", "sentimentAnalysis"],
};

export const analyzeMarketTrend = async (query: string): Promise<AnalysisResult> => {
  const prompt = `
    Bertindak sebagai analis riset pasar kelas dunia.
    Tugas Anda adalah menganalisis pasar untuk topik berikut: "${query}".
    Sintesis informasi dari kumpulan data simulasi yang luas dari postingan media sosial, forum online, dan artikel berita.
    Identifikasi tren paling kritis, keluhan konsumen, dan peluang produk potensial.
    Berikan analisis yang jelas dan terstruktur dalam format JSON. Bidang 'topic' dalam JSON harus merupakan kueri asli: "${query}". Semua output teks dalam JSON, seperti ringkasan, tren, keluhan, dan peluang, harus dalam Bahasa Indonesia.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedResult = JSON.parse(jsonText);
    
    // Basic validation to ensure the result matches the expected structure
    if (
      !parsedResult.summary ||
      !Array.isArray(parsedResult.keyTrends) ||
      !parsedResult.sentimentAnalysis
    ) {
      throw new Error("Struktur respons dari API tidak valid.");
    }
    
    return parsedResult as AnalysisResult;

  } catch (error) {
    console.error("Kesalahan saat memanggil Gemini API:", error);
    throw new Error("Gagal menganalisis tren pasar. API mengembalikan kesalahan.");
  }
};