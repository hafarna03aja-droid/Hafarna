<<<<<<< HEAD
=======

>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
<<<<<<< HEAD
    throw new Error("Variabel lingkungan API_KEY tidak diatur");
=======
    throw new Error("API_KEY environment variable not set");
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    topic: {
        type: Type.STRING,
<<<<<<< HEAD
        description: "Topik atau produk asli yang dianalisis."
    },
    summary: {
      type: Type.STRING,
      description: "Ringkasan singkat 1-2 paragraf dari sentimen pasar secara keseluruhan dan temuan utama.",
    },
    keyTrends: {
      type: Type.ARRAY,
      description: "Daftar 3-5 tren utama yang muncul yang diidentifikasi dari data.",
=======
        description: "The original topic or product that was analyzed."
    },
    summary: {
      type: Type.STRING,
      description: "A concise, 1-2 paragraph summary of the overall market sentiment and key findings.",
    },
    keyTrends: {
      type: Type.ARRAY,
      description: "A list of 3-5 key emerging trends identified from the data.",
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
      items: { type: Type.STRING },
    },
    consumerComplaints: {
      type: Type.ARRAY,
<<<<<<< HEAD
      description: "Daftar 3-5 keluhan umum atau masalah yang disebutkan oleh konsumen.",
=======
      description: "A list of 3-5 common complaints or pain points mentioned by consumers.",
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
      items: { type: Type.STRING },
    },
    productOpportunities: {
      type: Type.ARRAY,
<<<<<<< HEAD
      description: "Daftar 3-5 ide produk baru atau perbaikan fitur potensial berdasarkan analisis.",
=======
      description: "A list of 3-5 potential new product ideas or feature improvements based on the analysis.",
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
      items: { type: Type.STRING },
    },
    sentimentAnalysis: {
      type: Type.OBJECT,
<<<<<<< HEAD
      description: "Rincian sentimen pasar menjadi persentase positif, negatif, dan netral. Total persentase harus 100.",
      properties: {
        positive: { type: Type.NUMBER, description: "Persentase sentimen positif (0-100)." },
        negative: { type: Type.NUMBER, description: "Persentase sentimen negatif (0-100)." },
        neutral: { type: Type.NUMBER, description: "Persentase sentimen netral (0-100)." },
=======
      description: "A breakdown of the market sentiment into positive, negative, and neutral percentages. The percentages should sum up to 100.",
      properties: {
        positive: { type: Type.NUMBER, description: "Percentage of positive sentiment (0-100)." },
        negative: { type: Type.NUMBER, description: "Percentage of negative sentiment (0-100)." },
        neutral: { type: Type.NUMBER, description: "Percentage of neutral sentiment (0-100)." },
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
      },
    },
  },
  required: ["topic", "summary", "keyTrends", "consumerComplaints", "productOpportunities", "sentimentAnalysis"],
};

export const analyzeMarketTrend = async (query: string): Promise<AnalysisResult> => {
  const prompt = `
<<<<<<< HEAD
    Bertindak sebagai analis riset pasar kelas dunia.
    Tugas Anda adalah menganalisis pasar untuk topik berikut: "${query}".
    Sintesis informasi dari kumpulan data simulasi yang luas dari postingan media sosial, forum online, dan artikel berita.
    Identifikasi tren paling kritis, keluhan konsumen, dan peluang produk potensial.
    Berikan analisis yang jelas dan terstruktur dalam format JSON. Bidang 'topic' dalam JSON harus merupakan kueri asli: "${query}". Semua output teks dalam JSON, seperti ringkasan, tren, keluhan, dan peluang, harus dalam Bahasa Indonesia.
=======
    Act as a world-class market research analyst.
    Your task is to analyze the market for the following topic: "${query}".
    Synthesize information from a vast, simulated dataset of social media posts, online forums, and news articles.
    Identify the most critical trends, consumer complaints, and potential product opportunities.
    Provide a clear, structured analysis in JSON format. The topic field in the JSON should be the original query: "${query}".
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
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
<<<<<<< HEAD
      throw new Error("Struktur respons dari API tidak valid.");
=======
      throw new Error("Invalid response structure from API.");
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
    }
    
    return parsedResult as AnalysisResult;

  } catch (error) {
<<<<<<< HEAD
    console.error("Kesalahan saat memanggil Gemini API:", error);
    throw new Error("Gagal menganalisis tren pasar. API mengembalikan kesalahan.");
  }
};
=======
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze market trends. The API returned an error.");
  }
};
>>>>>>> e2c5bb55a15deda66cd851d3b6cf324b91dcc05c
