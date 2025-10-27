'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: string;
  change: number;
  volume: number;
}

export function LiveTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch top 10 trending tokens from Dexscreener
  const fetchTrendingTokens = async () => {
    try {
      // Fetch trending Solana pairs from Dexscreener
      const response = await fetch('https://api.dexscreener.com/latest/dex/search/?q=SOL');
      const data = await response.json();

      if (data.pairs && data.pairs.length > 0) {
        // Sort by 24h volume and take top 10
        const sortedPairs = data.pairs
          .filter((pair: any) => pair.chainId === 'solana' && pair.volume?.h24 > 0)
          .sort((a: any, b: any) => (b.volume?.h24 || 0) - (a.volume?.h24 || 0))
          .slice(0, 10);

        const tickers: TickerItem[] = sortedPairs.map((pair: any) => ({
          symbol: pair.baseToken?.symbol || 'UNKNOWN',
          price: formatPrice(pair.priceUsd),
          change: pair.priceChange?.h24 || 0,
          volume: pair.volume?.h24 || 0,
        }));

        setTickerData(tickers);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch trending tokens:', error);
      // Fallback to default data if API fails
      setTickerData([
        { symbol: 'SOL', price: '$95.42', change: 5.2, volume: 1000000 },
        { symbol: 'BONK', price: '$0.000012', change: -3.1, volume: 500000 },
        { symbol: 'JUP', price: '$0.65', change: 8.7, volume: 800000 },
      ]);
      setLoading(false);
    }
  };

  // Format price based on value
  const formatPrice = (priceStr: string | undefined): string => {
    if (!priceStr) return '$0.00';
    const price = parseFloat(priceStr);
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else if (price >= 0.01) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(8)}`;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchTrendingTokens();

    // Update every 30 seconds
    const interval = setInterval(fetchTrendingTokens, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading || tickerData.length === 0) {
    return null; // Don't show ticker while loading
  }

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#0A0E27] via-[#1a1f3f] to-[#0A0E27] border-y-2 border-[#00FF41] relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF4120] to-transparent"></div>

      <motion.div
        className="flex gap-8 py-3 px-4"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 20,
            ease: 'linear',
          },
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 whitespace-nowrap font-bold"
          >
            <span className="text-white text-sm uppercase tracking-wider font-black">
              {item.symbol}
            </span>
            <span className="text-[#00FF41] text-sm font-mono">
              {item.price}
            </span>
            <span
              className={`flex items-center gap-1 text-xs font-black ${
                item.change >= 0 ? 'text-[#00FF41]' : 'text-[#FF0040]'
              }`}
            >
              {item.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {item.change >= 0 ? '+' : ''}
              {item.change.toFixed(1)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
