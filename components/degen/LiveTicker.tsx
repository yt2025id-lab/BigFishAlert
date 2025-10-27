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
      // Use Dexscreener's trending endpoint for real-time top tokens
      const response = await fetch('https://api.dexscreener.com/token-boosts/top/v1');
      const data = await response.json();

      const tickers: TickerItem[] = [];

      // Process trending tokens (sorted by boost amount = popularity)
      if (data && Array.isArray(data)) {
        // Filter for Solana chain only and take top 10
        const solanaTokens = data
          .filter((item: any) => item.chainId === 'solana')
          .slice(0, 10);

        // Fetch detailed data for each token
        const detailedResponses = await Promise.all(
          solanaTokens.map((item: any) =>
            fetch(`https://api.dexscreener.com/latest/dex/tokens/${item.tokenAddress}`)
              .then((res) => res.json())
              .catch(() => null)
          )
        );

        detailedResponses.forEach((tokenData) => {
          if (tokenData && tokenData.pairs && tokenData.pairs.length > 0) {
            // Get the most liquid Solana pair
            const bestPair = tokenData.pairs
              .filter((p: any) => p.chainId === 'solana')
              .sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];

            if (bestPair) {
              tickers.push({
                symbol: bestPair.baseToken?.symbol || 'UNKNOWN',
                price: formatPrice(bestPair.priceUsd),
                change: bestPair.priceChange?.h24 || 0,
                volume: bestPair.volume?.h24 || 0,
              });
            }
          }
        });
      }

      // Fallback: if trending API fails, use popular tokens
      if (tickers.length === 0) {
        const popularTokens = [
          'So11111111111111111111111111111111111111112', // SOL
          'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', // BONK
          'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN', // JUP
          '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', // RAY
          'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE', // ORCA
          'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm', // WIF
          'HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3', // PYTH
          'jtojtomepa8beP8AuQc6eXt5FriJwfFMwQx2v2f9mCL', // JTO
          'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So', // mSOL
          '7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj', // stSOL
        ];

        const responses = await Promise.all(
          popularTokens.map((address) =>
            fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`)
              .then((res) => res.json())
              .catch(() => null)
          )
        );

        responses.forEach((tokenData) => {
          if (tokenData && tokenData.pairs && tokenData.pairs.length > 0) {
            const bestPair = tokenData.pairs
              .filter((p: any) => p.chainId === 'solana')
              .sort((a: any, b: any) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0))[0];

            if (bestPair && bestPair.volume?.h24 > 0) {
              tickers.push({
                symbol: bestPair.baseToken?.symbol || 'UNKNOWN',
                price: formatPrice(bestPair.priceUsd),
                change: bestPair.priceChange?.h24 || 0,
                volume: bestPair.volume?.h24 || 0,
              });
            }
          }
        });
      }

      // Sort by volume and take top 10
      const sortedTickers = tickers
        .sort((a, b) => b.volume - a.volume)
        .slice(0, 10);

      if (sortedTickers.length > 0) {
        setTickerData(sortedTickers);
      } else {
        // Fallback if no data
        setTickerData([
          { symbol: 'SOL', price: '$95.42', change: 5.2, volume: 1000000 },
          { symbol: 'BONK', price: '$0.000012', change: -3.1, volume: 500000 },
          { symbol: 'JUP', price: '$0.65', change: 8.7, volume: 800000 },
        ]);
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

      {/* Title - Fixed position */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#0A0E27] px-3 py-1 rounded border border-[#00FF41]">
        <span className="text-[#00FF41] text-xs font-black uppercase tracking-widest">
          TOP 10 TRENDING
        </span>
      </div>

      <motion.div
        className="flex gap-8 py-3 pl-48 pr-4"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {/* Duplicate items for seamless loop */}
        {[...tickerData, ...tickerData, ...tickerData].map((item, index) => {
          // Calculate rank (1-10, repeating)
          const rank = (index % tickerData.length) + 1;

          return (
            <div
              key={index}
              className="flex items-center gap-3 whitespace-nowrap font-bold"
            >
              {/* Rank number */}
              <span className="text-[#00FF41] text-xs font-black bg-[#00FF4120] px-2 py-0.5 rounded">
                #{rank}
              </span>
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
          );
        })}
      </motion.div>
    </div>
  );
}
