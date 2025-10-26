'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingDown, TrendingUp, AlertTriangle, Clock, Target } from 'lucide-react';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface WhalePrediction {
  dumpProbability: number;
  predictedAction: string;
  triggerPoint: string;
  timeframe: string;
  confidence: string;
  reasoning: string;
  recommendation: string;
  signals?: string[];
}

interface AIWhalePredictionProps {
  topHolders: any[];
  tokenData: any;
  language: 'en' | 'id';
}

export function AIWhalePrediction({
  topHolders,
  tokenData,
  language,
}: AIWhalePredictionProps) {
  const { isDegen } = useTheme();
  const [prediction, setPrediction] = useState<WhalePrediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrediction();
  }, [topHolders, tokenData]);

  const fetchPrediction = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/ai-predict-whale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topHolders, tokenData, language }),
      });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction);
      }
    } catch (error) {
      console.error('Failed to fetch AI prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card
        className={`${
          isDegen
            ? 'bg-gradient-to-br from-[#0A0E27] to-[#1a1f3f] border-2 border-[#BD00FF]'
            : 'bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600'
        }`}
        style={isDegen ? { boxShadow: '0 0 30px rgba(189, 0, 255, 0.3)' } : undefined}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-ocean-50">
            <Brain className="w-6 h-6 animate-pulse" />
            {isDegen
              ? language === 'en'
                ? '🤖 AI WHALE HUNTER ANALYZING...'
                : '🤖 AI PEMBURU PAUS MENGANALISIS...'
              : language === 'en'
              ? 'AI Whale Behavior Analysis'
              : 'Analisis Perilaku Paus AI'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean-400"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) return null;

  const getProbabilityColor = (prob: number) => {
    if (prob >= 70) return isDegen ? '#FF0040' : '#ef4444'; // High risk - red
    if (prob >= 40) return isDegen ? '#FFFF00' : '#eab308'; // Medium - yellow
    return isDegen ? '#00FF41' : '#22c55e'; // Low - green
  };

  const getConfidenceIcon = (conf: string) => {
    if (conf === 'HIGH') return '🔴';
    if (conf === 'MEDIUM') return '🟡';
    return '🟢';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className={`${
          isDegen
            ? 'bg-gradient-to-br from-[#0A0E27] to-[#1a1f3f] border-2'
            : 'bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600'
        }`}
        style={
          isDegen
            ? {
                borderColor:
                  prediction.dumpProbability >= 70
                    ? '#FF0040'
                    : prediction.dumpProbability >= 40
                    ? '#FFFF00'
                    : '#00FF41',
                boxShadow: `0 0 30px ${getProbabilityColor(prediction.dumpProbability)}50`,
              }
            : undefined
        }
      >
        <CardHeader>
          <CardTitle
            className={`flex items-center gap-2 ${
              isDegen ? 'text-2xl font-black uppercase tracking-wide' : 'text-xl'
            }`}
          >
            <Brain className={isDegen ? 'w-7 h-7' : 'w-6 h-6'} />
            {isDegen
              ? language === 'en'
                ? '🤖 AI WHALE PREDICTION'
                : '🤖 PREDIKSI PAUS AI'
              : language === 'en'
              ? 'AI Whale Behavior Prediction'
              : 'Prediksi Perilaku Paus AI'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Dump Probability Gauge */}
          <div className="text-center p-6 rounded-lg bg-ocean-950/50">
            <div className="text-sm text-ocean-300 mb-2">
              {language === 'en' ? 'Dump Probability' : 'Probabilitas Dump'}
            </div>
            <div
              className={`${isDegen ? 'text-6xl' : 'text-5xl'} font-bold mb-2`}
              style={{ color: getProbabilityColor(prediction.dumpProbability) }}
            >
              {prediction.dumpProbability}%
            </div>
            <div className="h-2 bg-ocean-900 rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full"
                style={{ backgroundColor: getProbabilityColor(prediction.dumpProbability) }}
                initial={{ width: 0 }}
                animate={{ width: `${prediction.dumpProbability}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <p className={`mt-2 ${isDegen ? 'font-black text-lg' : 'text-sm'} text-ocean-200`}>
              {prediction.predictedAction}
            </p>
          </div>

          {/* Prediction Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trigger Point */}
            <div
              className={`p-4 rounded-lg ${
                isDegen ? 'bg-[#1a1f3f] border border-[#00FF41]/30' : 'bg-ocean-950/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target
                  className="w-4 h-4"
                  style={{ color: isDegen ? '#00FF41' : undefined }}
                />
                <div className="text-sm text-ocean-300">
                  {language === 'en' ? 'Trigger Point' : 'Titik Pemicu'}
                </div>
              </div>
              <div className={`${isDegen ? 'font-bold text-[#00FF41]' : 'text-ocean-100'}`}>
                {prediction.triggerPoint}
              </div>
            </div>

            {/* Timeframe */}
            <div
              className={`p-4 rounded-lg ${
                isDegen ? 'bg-[#1a1f3f] border border-[#FFFF00]/30' : 'bg-ocean-950/30'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" style={{ color: isDegen ? '#FFFF00' : undefined }} />
                <div className="text-sm text-ocean-300">
                  {language === 'en' ? 'Timeframe' : 'Jangka Waktu'}
                </div>
              </div>
              <div className={`${isDegen ? 'font-bold text-[#FFFF00]' : 'text-ocean-100'}`}>
                {prediction.timeframe}
              </div>
            </div>
          </div>

          {/* AI Reasoning */}
          <div
            className={`p-4 rounded-lg ${
              isDegen
                ? 'bg-[#BD00FF]/10 border-2 border-[#BD00FF]/30'
                : 'bg-blue-500/10 border border-blue-500/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4" />
              <span className={`text-sm font-bold ${isDegen ? 'uppercase' : ''}`}>
                {language === 'en' ? 'AI Analysis:' : 'Analisis AI:'}
              </span>
              <Badge
                variant="outline"
                className={isDegen ? 'font-black' : ''}
                style={
                  isDegen
                    ? {
                        borderColor: '#BD00FF',
                        color: '#BD00FF',
                      }
                    : undefined
                }
              >
                {getConfidenceIcon(prediction.confidence)} {prediction.confidence}
              </Badge>
            </div>
            <p className="text-ocean-100 leading-relaxed">{prediction.reasoning}</p>
          </div>

          {/* Recommendation */}
          <div
            className={`p-4 rounded-lg ${
              prediction.dumpProbability >= 70
                ? isDegen
                  ? 'bg-[#FF0040]/10 border-2 border-[#FF0040]'
                  : 'bg-red-500/10 border border-red-500/20'
                : prediction.dumpProbability >= 40
                ? isDegen
                  ? 'bg-[#FFFF00]/10 border-2 border-[#FFFF00]'
                  : 'bg-yellow-500/10 border border-yellow-500/20'
                : isDegen
                ? 'bg-[#00FF41]/10 border-2 border-[#00FF41]'
                : 'bg-green-500/10 border border-green-500/20'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className={`font-bold ${isDegen ? 'text-lg uppercase' : 'text-sm'}`}>
                {isDegen
                  ? language === 'en'
                    ? '⚡ ACTION REQUIRED:'
                    : '⚡ TINDAKAN DIPERLUKAN:'
                  : language === 'en'
                  ? 'Recommendation:'
                  : 'Rekomendasi:'}
              </span>
            </div>
            <p className={`${isDegen ? 'font-bold text-lg' : ''} text-ocean-100`}>
              {prediction.recommendation}
            </p>
          </div>

          {/* Signals */}
          {prediction.signals && prediction.signals.length > 0 && (
            <div className="space-y-2">
              <div className="text-sm text-ocean-300 font-semibold">
                {language === 'en' ? 'Key Signals:' : 'Sinyal Kunci:'}
              </div>
              <div className="space-y-1">
                {prediction.signals.map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-ocean-200"
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        isDegen ? 'bg-[#00FF41]' : 'bg-ocean-400'
                      }`}
                    />
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="text-xs text-ocean-400 text-center pt-4 border-t border-ocean-700">
            {isDegen
              ? language === 'en'
                ? '⚠️ AI prediction ser! Not financial advice! DYOR! 🦍'
                : '⚠️ Prediksi AI bro! Bukan saran keuangan! Riset sendiri! 🦍'
              : language === 'en'
              ? '* AI prediction based on current data. Not financial advice. Always DYOR.'
              : '* Prediksi AI berdasarkan data saat ini. Bukan saran keuangan. Selalu DYOR.'}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
