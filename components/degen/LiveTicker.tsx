'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  symbol: string;
  price: string;
  change: number;
  emoji: string;
}

export function LiveTicker() {
  const [tickerData, setTickerData] = useState<TickerItem[]>([
    { symbol: 'SOL', price: '$95.42', change: 5.2, emoji: '🔥' },
    { symbol: 'BONK', price: '$0.000012', change: -3.1, emoji: '🐕' },
    { symbol: 'JUP', price: '$0.65', change: 8.7, emoji: '🪐' },
    { symbol: 'RAY', price: '$2.34', change: 2.1, emoji: '⚡' },
    { symbol: 'ORCA', price: '$3.45', change: -1.5, emoji: '🐋' },
    { symbol: 'MNGO', price: '$0.08', change: 12.4, emoji: '🥭' },
  ]);

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
            className="flex items-center gap-2 whitespace-nowrap font-bold"
          >
            <span className="text-xl">{item.emoji}</span>
            <span className="text-white text-sm uppercase tracking-wider">
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
              {Math.abs(item.change).toFixed(1)}%
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
