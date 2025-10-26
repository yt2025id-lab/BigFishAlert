'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getRiskLabelDegen } from '@/lib/i18n/degenSpeak';

interface RiskSpeedometerProps {
  score: number;
  language?: 'en' | 'id';
}

export function RiskSpeedometer({ score, language = 'en' }: RiskSpeedometerProps) {
  const { isDegen } = useTheme();
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score counting up
  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 1500; // 1.5 seconds
    const increment = end / (duration / 16); // 60fps

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  // Calculate needle rotation (-90 to +90 degrees)
  const rotation = (score / 100) * 180 - 90;

  // Get color based on score
  const getColor = () => {
    if (score >= 70) return isDegen ? '#FF0040' : '#ef4444'; // Red
    if (score >= 50) return isDegen ? '#FFFF00' : '#eab308'; // Yellow
    return isDegen ? '#00FF41' : '#22c55e'; // Green
  };

  const getGlow = () => {
    if (!isDegen) return '';
    if (score >= 70) return '0 0 30px rgba(255, 0, 64, 0.6)';
    if (score >= 50) return '0 0 30px rgba(255, 255, 0, 0.6)';
    return '0 0 30px rgba(0, 255, 65, 0.6)';
  };

  const riskLabel = isDegen ? getRiskLabelDegen(score, language) : '';

  if (isDegen) {
    return (
      <div className="relative w-full max-w-sm mx-auto">
        {/* Speedometer Container */}
        <div className="relative aspect-square">
          {/* Background Gauge */}
          <svg className="w-full h-full" viewBox="0 0 200 120">
            {/* Danger Zone (Red) */}
            <path
              d="M 20 100 A 80 80 0 0 1 60 35"
              fill="none"
              stroke="#FF0040"
              strokeWidth="12"
              opacity="0.3"
            />
            {/* Caution Zone (Yellow) */}
            <path
              d="M 60 35 A 80 80 0 0 1 140 35"
              fill="none"
              stroke="#FFFF00"
              strokeWidth="12"
              opacity="0.3"
            />
            {/* Safe Zone (Green) */}
            <path
              d="M 140 35 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#00FF41"
              strokeWidth="12"
              opacity="0.3"
            />

            {/* Active Arc */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={getColor()}
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: score / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                filter: `drop-shadow(${getGlow()})`,
              }}
            />

            {/* Center Dot */}
            <circle cx="100" cy="100" r="8" fill={getColor()} />

            {/* Needle */}
            <motion.line
              x1="100"
              y1="100"
              x2="100"
              y2="30"
              stroke={getColor()}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ rotate: -90 }}
              animate={{ rotate: rotation }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                transformOrigin: '100px 100px',
                filter: `drop-shadow(${getGlow()})`,
              }}
            />
          </svg>

          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-16">
            <motion.div
              className="text-7xl font-black"
              style={{
                color: getColor(),
                textShadow: `0 0 20px ${getColor()}`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {displayScore}
            </motion.div>
            <div className="text-sm text-gray-400 mt-1">/ 100</div>
          </div>
        </div>

        {/* Risk Label */}
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div
            className="inline-block px-6 py-3 rounded-lg font-black text-xl uppercase tracking-wider"
            style={{
              background: `linear-gradient(135deg, ${getColor()}22 0%, ${getColor()}44 100%)`,
              border: `2px solid ${getColor()}`,
              color: getColor(),
              boxShadow: getGlow(),
            }}
          >
            {riskLabel}
          </div>
        </motion.div>

        {/* Pulsing Alert for High Risk */}
        {score >= 70 && (
          <motion.div
            className="absolute top-0 right-0 text-4xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            🚨
          </motion.div>
        )}
      </div>
    );
  }

  // Professional Mode (Original Simple Display)
  return (
    <div className="text-center p-6 rounded-lg bg-ocean-950/50">
      <div className="text-6xl mb-2">
        {score >= 70 ? '🐋' : score >= 50 ? '🐬' : '🐟'}
      </div>
      <motion.div
        className="text-5xl font-bold text-ocean-50 mb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {displayScore}
        <span className="text-2xl text-ocean-300">/100</span>
      </motion.div>
      <p className="text-ocean-200">
        {language === 'en' ? 'Big Fish Risk Score' : 'Skor Risiko Ikan Besar'}
      </p>
    </div>
  );
}
