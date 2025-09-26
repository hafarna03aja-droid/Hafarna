import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeMarketTrend } from './services/geminiService';
import type { AnalysisResult } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!query.trim()) {
      setError('Silakan masukkan topik untuk dianalisis.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeMarketTrend(query);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('Terjadi kesalahan saat analisis. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-brand-secondary opacity-20 blur-[100px]"></div>
      </div>

      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <p className="text-center text-lg text-slate-300 mb-8 animate-fade-in">
          Masukkan produk, industri, atau topik untuk mengungkap tren pasar, umpan balik konsumen, dan peluang baru yang didukung oleh AI.
        </p>

        <SearchBar
          query={query}
          setQuery={setQuery}
          onAnalyze={handleAnalysis}
          isLoading={isLoading}
        />

        {isLoading && <LoadingSpinner />}
        
        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg animate-fade-in">
            <p>{error}</p>
          </div>
        )}

        {analysisResult && !isLoading && (
          <div className="mt-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-4 text-slate-100">Analisis untuk "{analysisResult.topic}"</h2>
            <ResultsDisplay result={analysisResult} />
          </div>
        )}
      </main>

      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Analisis Tren Pasar &copy; 2024. Hak cipta dilindungi undang-undang.</p>
      </footer>
    </div>
  );
};

export default App;