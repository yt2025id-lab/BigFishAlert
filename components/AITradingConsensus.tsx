'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Trophy, BarChart3, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface AIModel {
  name: string;
  fullName: string;
  signal: 'BUY' | 'HOLD' | 'SELL';
  returnPercent: number;
  totalValue: number;
  icon: string;
  color: string;
}

interface TokenMetrics {
  bigFishScore: number; // 0-100
  liquidity: number;
  volume24h: number;
  holderConcentration: number; // 0-100
}

interface AITradingConsensusProps {
  tokenSymbol: string;
  language: 'en' | 'id';
  tokenMetrics: TokenMetrics;
}

export function AITradingConsensus({ tokenSymbol, language, tokenMetrics }: AITradingConsensusProps) {
  const { isDegen } = useTheme();

  /**
   * Seeded random number generator for consistent but different results per token
   * Uses tokenSymbol as seed so same token always gets same results
   */
  const seededRandom = (seed: string, index: number): number => {
    let hash = 0;
    const seedStr = seed + index.toString();
    for (let i = 0; i < seedStr.length; i++) {
      const char = seedStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    const normalized = Math.abs(hash) / 2147483647; // Normalize to 0-1
    return normalized;
  };

  /**
   * Generate dynamic AI model signals based on actual token metrics
   * Each AI model has different "personality" for decision-making
   */
  const generateAIModels = (): AIModel[] => {
    const { bigFishScore, liquidity, volume24h, holderConcentration } = tokenMetrics;

    // Base capital for all models
    const baseCapital = 10000;

    // Risk levels: 0-30 = LOW, 30-60 = MEDIUM, 60-100 = HIGH
    const riskLevel = bigFishScore;

    // Get token-specific random variations (consistent per token)
    const getRandom = (modelIndex: number) => seededRandom(tokenSymbol, modelIndex);

    // Calculate model-specific signals and returns
    // Each model uses different strategy and risk tolerance

    // 1. DEEPSEEK - Aggressive trend follower (likes high risk if volume is good)
    const deepseekSignal =
      riskLevel < 40 && volume24h > 50000 ? 'BUY' : riskLevel > 65 ? 'SELL' : 'HOLD';
    const deepseekReturn =
      deepseekSignal === 'BUY'
        ? 30 + (volume24h / 10000) * 5 + getRandom(1) * 15
        : deepseekSignal === 'SELL'
        ? -20 - (riskLevel / 10) * 3 - getRandom(1) * 10
        : 10 + getRandom(1) * 15;

    // 2. GROK 4 - Contrarian (buys dips, sells peaks)
    const grokSignal = riskLevel > 70 ? 'SELL' : riskLevel < 35 ? 'BUY' : 'HOLD';
    const grokReturn =
      grokSignal === 'BUY'
        ? 25 + (100 - holderConcentration) * 0.2 + getRandom(2) * 13
        : grokSignal === 'SELL'
        ? -15 - (riskLevel / 15) * 4 - getRandom(2) * 12
        : 15 + getRandom(2) * 10;

    // 3. CLAUDE - Conservative (avoids high risk, prefers liquidity)
    const claudeSignal =
      riskLevel < 30 && liquidity > 100000 ? 'BUY' : riskLevel > 50 ? 'SELL' : 'HOLD';
    const claudeReturn =
      claudeSignal === 'BUY'
        ? 15 + (liquidity / 50000) * 2 + getRandom(3) * 10
        : claudeSignal === 'SELL'
        ? -10 - (riskLevel / 20) * 2 - getRandom(3) * 8
        : 20 + getRandom(3) * 8;

    // 4. QWEN3 - Fundamental analyst (focuses on holder concentration)
    const qwen3Signal =
      holderConcentration < 50 && riskLevel < 45 ? 'BUY' : holderConcentration > 75 ? 'SELL' : 'HOLD';
    const qwen3Return =
      qwen3Signal === 'BUY'
        ? 10 + (100 - holderConcentration) * 0.3 + getRandom(4) * 12
        : qwen3Signal === 'SELL'
        ? -18 - (holderConcentration / 10) * 3 - getRandom(4) * 10
        : 5 + getRandom(4) * 12;

    // 5. GPT-5 - Pessimistic (bearish on most tokens)
    const gpt5Signal = riskLevel < 25 && liquidity > 200000 ? 'HOLD' : riskLevel > 40 ? 'SELL' : 'HOLD';
    const gpt5Return =
      gpt5Signal === 'HOLD'
        ? -5 + getRandom(5) * 10
        : -20 - (riskLevel / 8) * 4 - getRandom(5) * 15;

    // 6. GEMINI - Risk-averse (sells at first sign of danger)
    const geminiSignal = riskLevel > 55 || holderConcentration > 70 ? 'SELL' : riskLevel < 30 ? 'BUY' : 'HOLD';
    const geminiReturn =
      geminiSignal === 'BUY'
        ? 12 + (liquidity / 80000) * 2 + getRandom(6) * 8
        : geminiSignal === 'SELL'
        ? -25 - (riskLevel / 10) * 3.5 - getRandom(6) * 12
        : -2 + getRandom(6) * 8;

    // Calculate total values based on returns
    const models: AIModel[] = [
      {
        name: 'DEEPSEEK',
        fullName: 'DEEPSEEK CHAT V3.1',
        signal: deepseekSignal as 'BUY' | 'HOLD' | 'SELL',
        returnPercent: deepseekReturn,
        totalValue: baseCapital * (1 + deepseekReturn / 100),
        icon: '🔷',
        color: '#5865F2',
      },
      {
        name: 'GROK 4',
        fullName: 'GROK 4',
        signal: grokSignal as 'BUY' | 'HOLD' | 'SELL',
        returnPercent: grokReturn,
        totalValue: baseCapital * (1 + grokReturn / 100),
        icon: '⚫',
        color: '#000000',
      },
      {
        name: 'CLAUDE',
        fullName: 'CLAUDE SONNET 4.5',
        signal: claudeSignal as 'BUY' | 'HOLD' | 'SELL',
        returnPercent: claudeReturn,
        totalValue: baseCapital * (1 + claudeReturn / 100),
        icon: '🌟',
        color: '#FF6B35',
      },
      {
        name: 'QWEN3',
        fullName: 'QWEN3 MAX',
        signal: qwen3Signal as 'BUY' | 'HOLD' | 'SELL',
        returnPercent: qwen3Return,
        totalValue: baseCapital * (1 + qwen3Return / 100),
        icon: '💠',
        color: '#A855F7',
      },
      {
        name: 'GPT 5',
        fullName: 'GPT 5',
        signal: gpt5Signal as 'BUY' | 'HOLD' | 'SELL',
        returnPercent: gpt5Return,
        totalValue: baseCapital * (1 + gpt5Return / 100),
        icon: '🔴',
        color: '#10B981',
      },
      {
        name: 'GEMINI',
        fullName: 'GEMINI 2.5 PRO',
        signal: geminiSignal as 'BUY' | 'HOLD' | 'SELL',
        returnPercent: geminiReturn,
        totalValue: baseCapital * (1 + geminiReturn / 100),
        icon: '💎',
        color: '#3B82F6',
      },
    ];

    // Sort by total value (highest first)
    return models.sort((a, b) => b.totalValue - a.totalValue);
  };

  const models = generateAIModels();

  // Calculate consensus
  const buyCount = models.filter((m) => m.signal === 'BUY').length;
  const holdCount = models.filter((m) => m.signal === 'HOLD').length;
  const sellCount = models.filter((m) => m.signal === 'SELL').length;

  const consensus =
    buyCount > sellCount + holdCount ? 'BUY' : sellCount > buyCount + holdCount ? 'SELL' : 'HOLD';

  const consensusPercentage = Math.round(
    (Math.max(buyCount, holdCount, sellCount) / models.length) * 100
  );

  const winningModel = models[0]; // DeepSeek (highest return)

  const getSignalIcon = (signal: string) => {
    if (signal === 'BUY') return <TrendingUp className="w-4 h-4" />;
    if (signal === 'SELL') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getSignalColor = (signal: string) => {
    if (signal === 'BUY') return isDegen ? '#00FF41' : '#22c55e';
    if (signal === 'SELL') return isDegen ? '#FF0040' : '#ef4444';
    return isDegen ? '#FFFF00' : '#eab308';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        className={`${
          isDegen
            ? 'bg-gradient-to-br from-[#0A0E27] to-[#1a1f3f] border-2 border-[#00D9FF]'
            : 'bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600'
        }`}
        style={isDegen ? { boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' } : undefined}
      >
        <CardHeader>
          <CardTitle
            className={`flex items-center gap-2 ${
              isDegen ? 'text-2xl font-black uppercase tracking-wide' : 'text-xl'
            }`}
          >
            <BarChart3 className={isDegen ? 'w-7 h-7' : 'w-6 h-6'} />
            {isDegen
              ? language === 'en'
                ? '🤖 AI WHALE SENTIMENT TRACKER'
                : '🤖 PELACAK SENTIMEN PAUS AI'
              : language === 'en'
              ? '🤖 AI Whale Sentiment Tracker'
              : '🤖 Pelacak Sentimen Paus AI'}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* PROMINENT WARNING DISCLAIMER - TOP OF SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`p-4 rounded-lg border-2 ${
              isDegen
                ? 'bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20 border-yellow-400'
                : 'bg-gradient-to-r from-yellow-500/10 via-amber-500/10 to-yellow-500/10 border-yellow-500'
            }`}
            style={
              isDegen
                ? {
                    boxShadow: '0 0 20px rgba(234, 179, 8, 0.4), inset 0 0 20px rgba(234, 179, 8, 0.1)',
                  }
                : undefined
            }
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                className={`${isDegen ? 'w-6 h-6' : 'w-5 h-5'} text-yellow-400 flex-shrink-0 mt-0.5`}
              />
              <div>
                <div
                  className={`${
                    isDegen ? 'text-lg font-black uppercase' : 'text-sm font-bold'
                  } text-yellow-400 mb-1`}
                >
                  {language === 'en'
                    ? '⚠️ EXPERIMENTAL FEATURE - NOT FINANCIAL ADVICE'
                    : '⚠️ FITUR EKSPERIMENTAL - BUKAN SARAN KEUANGAN'}
                </div>
                <div className={`${isDegen ? 'text-sm' : 'text-xs'} text-yellow-100/90`}>
                  {language === 'en'
                    ? 'AI models analyze on-chain patterns. Always Do Your Own Research (DYOR)!'
                    : 'Model AI menganalisis pola on-chain. Selalu Lakukan Riset Sendiri (DYOR)!'}
                </div>
              </div>
            </div>
          </motion.div>
          {/* Winning Model Highlight */}
          <div
            className={`p-6 rounded-lg text-center ${
              isDegen
                ? 'bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 border-2 border-[#FFD700]'
                : 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20'
            }`}
            style={isDegen ? { boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)' } : undefined}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span
                className={`${
                  isDegen ? 'text-lg font-black uppercase' : 'text-sm font-semibold'
                } text-yellow-500`}
              >
                {language === 'en' ? 'WINNING MODEL' : 'MODEL PEMENANG'}
              </span>
            </div>

            <div className={`${isDegen ? 'text-3xl' : 'text-2xl'} font-bold text-ocean-50 mb-2`}>
              {winningModel.icon} {winningModel.fullName}
            </div>

            <div className="flex items-center justify-center gap-4 mb-3">
              <div>
                <div className="text-sm text-ocean-300">
                  {language === 'en' ? 'Total Equity' : 'Total Ekuitas'}
                </div>
                <div className={`${isDegen ? 'text-2xl' : 'text-xl'} font-bold text-[#00FF41]`}>
                  ${winningModel.totalValue.toLocaleString()}
                </div>
              </div>

              <div className="h-12 w-px bg-ocean-600" />

              <div>
                <div className="text-sm text-ocean-300">
                  {language === 'en' ? 'Return' : 'Keuntungan'}
                </div>
                <div className={`${isDegen ? 'text-2xl' : 'text-xl'} font-bold text-[#00FF41]`}>
                  +{winningModel.returnPercent.toFixed(2)}%
                </div>
              </div>
            </div>

            <Badge
              className={`${
                isDegen ? 'font-black text-lg px-4 py-2' : 'px-3 py-1'
              } bg-[#00FF41] text-black hover:bg-[#00FF41]`}
            >
              {language === 'en' ? 'AI SIGNAL: 🟢 BULLISH PATTERN' : 'SINYAL AI: 🟢 POLA BULLISH'}
            </Badge>
          </div>

          {/* Consensus Summary */}
          <div
            className={`p-4 rounded-lg ${
              isDegen ? 'bg-[#1a1f3f] border border-[#00D9FF]/30' : 'bg-ocean-950/30'
            }`}
          >
            <div className="text-center mb-4">
              <div className="text-sm text-ocean-300 mb-2">
                {language === 'en' ? 'AI Models Consensus' : 'Konsensus Model AI'}
              </div>
              <div
                className={`${isDegen ? 'text-4xl' : 'text-3xl'} font-bold mb-2`}
                style={{ color: getSignalColor(consensus) }}
              >
                {consensus}
              </div>
              <div className="text-sm text-ocean-200">
                {consensusPercentage}%{' '}
                {language === 'en' ? 'of models agree' : 'model setuju'} ({buyCount} BUY, {holdCount}{' '}
                HOLD, {sellCount} SELL)
              </div>
            </div>

            {/* Visual Vote Bar */}
            <div className="h-8 rounded-full overflow-hidden flex">
              {buyCount > 0 && (
                <div
                  className="bg-[#00FF41] flex items-center justify-center text-xs font-bold text-black"
                  style={{ width: `${(buyCount / models.length) * 100}%` }}
                >
                  {buyCount > 1 && `${buyCount} BUY`}
                </div>
              )}
              {holdCount > 0 && (
                <div
                  className="bg-[#FFFF00] flex items-center justify-center text-xs font-bold text-black"
                  style={{ width: `${(holdCount / models.length) * 100}%` }}
                >
                  {holdCount > 0 && `${holdCount} HOLD`}
                </div>
              )}
              {sellCount > 0 && (
                <div
                  className="bg-[#FF0040] flex items-center justify-center text-xs font-bold text-white"
                  style={{ width: `${(sellCount / models.length) * 100}%` }}
                >
                  {sellCount > 1 && `${sellCount} SELL`}
                </div>
              )}
            </div>
          </div>

          {/* Model Rankings Table */}
          <div className="space-y-2">
            <div
              className={`text-sm font-semibold text-ocean-300 mb-3 ${
                isDegen ? 'text-lg uppercase' : ''
              }`}
            >
              {language === 'en' ? '📊 Model Performance Rankings:' : '📊 Peringkat Performa Model:'}
            </div>

            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-3 rounded-lg ${
                  isDegen
                    ? 'bg-[#1a1f3f] border border-ocean-700/50 hover:border-[#00D9FF]/50'
                    : 'bg-ocean-950/30 hover:bg-ocean-950/50'
                } transition-all cursor-pointer`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        isDegen ? 'text-2xl' : 'text-xl'
                      } w-8 text-center font-bold text-ocean-400`}
                    >
                      #{index + 1}
                    </div>

                    <div className="text-2xl">{model.icon}</div>

                    <div>
                      <div
                        className={`${isDegen ? 'font-black' : 'font-semibold'} text-ocean-100`}
                      >
                        {model.fullName}
                      </div>
                      <div className="text-xs text-ocean-400">
                        ${model.totalValue.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div
                        className={`${
                          isDegen ? 'text-lg font-black' : 'text-sm font-bold'
                        } flex items-center gap-1`}
                        style={{
                          color:
                            model.returnPercent > 0
                              ? isDegen
                                ? '#00FF41'
                                : '#22c55e'
                              : isDegen
                              ? '#FF0040'
                              : '#ef4444',
                        }}
                      >
                        {model.returnPercent > 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {model.returnPercent > 0 ? '+' : ''}
                        {model.returnPercent.toFixed(2)}%
                      </div>
                    </div>

                    <Badge
                      className={`${isDegen ? 'font-black px-3' : 'px-2'} min-w-[60px] justify-center`}
                      style={{
                        backgroundColor: getSignalColor(model.signal),
                        color: model.signal === 'HOLD' ? '#000' : '#fff',
                      }}
                    >
                      {getSignalIcon(model.signal)}
                      <span className="ml-1">{model.signal}</span>
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Info Box */}
          <div
            className={`p-4 rounded-lg ${
              isDegen
                ? 'bg-[#00D9FF]/10 border-2 border-[#00D9FF]/30'
                : 'bg-blue-500/10 border border-blue-500/20'
            }`}
          >
            <div className="text-sm text-ocean-100 leading-relaxed">
              {isDegen
                ? language === 'en'
                  ? '💡 AI models trained on $10K each. DeepSeek winning with +42% return ser! These are SIGNALS not financial advice! DYOR! 🦍'
                  : '💡 Model AI dilatih dengan $10K masing-masing. DeepSeek menang dengan return +42% bro! Ini SINYAL bukan saran keuangan! Riset sendiri! 🦍'
                : language === 'en'
                ? '💡 AI models trained and tested with $10,000 initial capital each. Performance shown is historical backtesting results. Past performance does not guarantee future results.'
                : '💡 Model AI dilatih dan diuji dengan modal awal $10,000 masing-masing. Performa yang ditampilkan adalah hasil backtesting historis. Performa masa lalu tidak menjamin hasil masa depan.'}
            </div>
          </div>

          {/* Bottom Footnote Disclaimer */}
          <div
            className={`text-center pt-3 pb-1 border-t-2 ${
              isDegen ? 'border-yellow-500/50' : 'border-ocean-700'
            }`}
          >
            <div
              className={`${
                isDegen ? 'text-sm font-bold' : 'text-xs font-semibold'
              } text-yellow-400 mb-1`}
            >
              {language === 'en'
                ? '*AI predictions are experimental. Not financial or investment advice.'
                : '*Prediksi AI bersifat eksperimental. Bukan saran keuangan atau investasi.'}
            </div>
            <div className="text-xs text-ocean-400">
              {isDegen
                ? language === 'en'
                  ? 'Trade at your own risk ser! Always DYOR! 🚀'
                  : 'Trade dengan risiko sendiri bro! Selalu DYOR! 🚀'
                : language === 'en'
                ? 'For educational and informational purposes only. Conduct your own research before making any investment decisions.'
                : 'Hanya untuk tujuan edukasi dan informasi. Lakukan riset sendiri sebelum membuat keputusan investasi.'}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
