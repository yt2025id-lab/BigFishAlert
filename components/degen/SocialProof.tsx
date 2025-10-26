'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Clock, Flame } from 'lucide-react';

export function SocialProof() {
  const [watching, setWatching] = useState(247);
  const [lastScan, setLastScan] = useState(3);

  // Simulate live count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatching(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4">
      {/* Watching Now */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm uppercase"
        style={{
          background: 'linear-gradient(135deg, #00FF4122 0%, #00D9FF22 100%)',
          border: '2px solid #00FF41',
          color: '#00FF41',
          boxShadow: '0 0 20px rgba(0, 255, 65, 0.4)',
        }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 255, 65, 0.4)',
            '0 0 30px rgba(0, 255, 65, 0.6)',
            '0 0 20px rgba(0, 255, 65, 0.4)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Eye className="w-4 h-4" />
        <AnimatePresence mode="wait">
          <motion.span
            key={watching}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {watching} Degens Watching
          </motion.span>
        </AnimatePresence>
      </motion.div>

      {/* Last Scan */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm"
        style={{
          background: 'linear-gradient(135deg, #FFFF0022 0%, #FFD70022 100%)',
          border: '2px solid #FFFF00',
          color: '#FFFF00',
        }}
      >
        <Clock className="w-4 h-4" />
        <span>Last Scan: {lastScan}s ago</span>
      </div>

      {/* Trending */}
      <motion.div
        className="flex items-center gap-2 px-4 py-2 rounded-full font-black text-sm uppercase"
        style={{
          background: 'linear-gradient(135deg, #FF004022 0%, #BD00FF22 100%)',
          border: '2px solid #FF0040',
          color: '#FF0040',
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <Flame className="w-4 h-4" />
        <span>Trending #1</span>
      </motion.div>
    </div>
  );
}
