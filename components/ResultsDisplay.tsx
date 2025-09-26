
import React from 'react';
import type { AnalysisResult } from '../types';
import SentimentChart from './SentimentChart';
import ResultCard from './ResultCard';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const chartData = [
    { name: 'Positive', value: result.sentimentAnalysis.positive, fill: '#22c55e' },
    { name: 'Neutral', value: result.sentimentAnalysis.neutral, fill: '#64748b' },
    { name: 'Negative', value: result.sentimentAnalysis.negative, fill: '#ef4444' },
  ];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 p-6 bg-slate-800/50 border border-slate-700 rounded-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="text-xl font-bold mb-3 text-brand-light">Overall Summary</h3>
          <p className="text-slate-300 leading-relaxed">{result.summary}</p>
        </div>
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-lg animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="text-xl font-bold mb-3 text-center text-brand-light">Sentiment Analysis</h3>
          <SentimentChart data={chartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ResultCard
          title="Key Trends"
          icon={<TrendUpIcon />}
          items={result.keyTrends}
          animationDelay="300ms"
        />
        <ResultCard
          title="Consumer Complaints"
          icon={<AlertIcon />}
          items={result.consumerComplaints}
          animationDelay="400ms"
        />
        <ResultCard
          title="Product Opportunities"
          icon={<LightbulbIcon />}
          items={result.productOpportunities}
          animationDelay="500ms"
        />
      </div>
    </div>
  );
};

const TrendUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-400"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-400"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

const LightbulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-400"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
);


export default ResultsDisplay;
