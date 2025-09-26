
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    topic: {
        type: Type.STRING,
        description: "The original topic or product that was analyzed."
    },
    summary: {
      type: Type.STRING,
      description: "A concise, 1-2 paragraph summary of the overall market sentiment and key findings.",
    },
    keyTrends: {
      type: Type.ARRAY,
      description: "A list of 3-5 key emerging trends identified from the data.",
      items: { type: Type.STRING },
    },
    consumerComplaints: {
      type: Type.ARRAY,
      description: "A list of 3-5 common complaints or pain points mentioned by consumers.",
      items: { type: Type.STRING },
    },
    productOpportunities: {
      type: Type.ARRAY,
      description: "A list of 3-5 potential new product ideas or feature improvements based on the analysis.",
      items: { type: Type.STRING },
    },
    sentimentAnalysis: {
      type: Type.OBJECT,
      description: "A breakdown of the market sentiment into positive, negative, and neutral percentages. The percentages should sum up to 100.",
      properties: {
        positive: { type: Type.NUMBER, description: "Percentage of positive sentiment (0-100)." },
        negative: { type: Type.NUMBER, description: "Percentage of negative sentiment (0-100)." },
        neutral: { type: Type.NUMBER, description: "Percentage of neutral sentiment (0-100)." },
      },
    },
  },
  required: ["topic", "summary", "keyTrends", "consumerComplaints", "productOpportunities", "sentimentAnalysis"],
};

export const analyzeMarketTrend = async (query: string): Promise<AnalysisResult> => {
  const prompt = `
    Act as a world-class market research analyst.
    Your task is to analyze the market for the following topic: "${query}".
    Synthesize information from a vast, simulated dataset of social media posts, online forums, and news articles.
    Identify the most critical trends, consumer complaints, and potential product opportunities.
    Provide a clear, structured analysis in JSON format. The topic field in the JSON should be the original query: "${query}".
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
      throw new Error("Invalid response structure from API.");
    }
    
    return parsedResult as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to analyze market trends. The API returned an error.");
  }
};
