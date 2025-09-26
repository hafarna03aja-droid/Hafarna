
export interface SentimentData {
  positive: number;
  negative: number;
  neutral: number;
}

export interface AnalysisResult {
  topic: string;
  summary: string;
  keyTrends: string[];
  consumerComplaints: string[];
  productOpportunities: string[];
  sentimentAnalysis: SentimentData;
}
