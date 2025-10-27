'use client';

import { useState, useEffect } from 'react';

export interface FisherProfile {
  totalScans: number;
  bigFishFound: number;
  reputation: number;
  rank: 'Minnow' | 'Dolphin' | 'Whale' | 'Kraken';
  rankEmoji: string;
}

const STORAGE_KEY = 'bigfishalert_fisher_profile';

/**
 * Calculate fisher rank based on reputation score
 */
function calculateRank(reputation: number): {
  rank: FisherProfile['rank'];
  emoji: string;
} {
  if (reputation >= 1000) {
    return { rank: 'Kraken', emoji: '🦑' }; // Legendary
  } else if (reputation >= 500) {
    return { rank: 'Whale', emoji: '🐋' }; // Expert
  } else if (reputation >= 100) {
    return { rank: 'Dolphin', emoji: '🐬' }; // Intermediate
  } else {
    return { rank: 'Minnow', emoji: '🐟' }; // Beginner
  }
}

/**
 * Custom hook to track fisher profile stats
 * Stores in localStorage for persistence across sessions
 */
export function useFisherProfile() {
  const [profile, setProfile] = useState<FisherProfile>({
    totalScans: 0,
    bigFishFound: 0,
    reputation: 0,
    rank: 'Minnow',
    rankEmoji: '🐟',
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        const { rank, emoji } = calculateRank(data.reputation || 0);
        setProfile({
          totalScans: data.totalScans || 0,
          bigFishFound: data.bigFishFound || 0,
          reputation: data.reputation || 0,
          rank,
          rankEmoji: emoji,
        });
      }
    } catch (error) {
      console.error('Failed to load fisher profile:', error);
    }
  }, []);

  // Save to localStorage whenever profile changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to save fisher profile:', error);
    }
  }, [profile]);

  /**
   * Record a new token scan
   * @param bigFishScore - Risk score of the scanned token (0-100)
   */
  const recordScan = (bigFishScore: number) => {
    setProfile((prev) => {
      const newTotalScans = prev.totalScans + 1;
      const isBigFish = bigFishScore >= 60; // High risk = Big Fish
      const newBigFishFound = isBigFish ? prev.bigFishFound + 1 : prev.bigFishFound;

      // Calculate reputation points
      // +10 points per scan
      // +50 bonus points for finding a Big Fish (risky token)
      // +5 points every 10 scans (milestone bonus)
      let reputationGain = 10;
      if (isBigFish) reputationGain += 50;
      if (newTotalScans % 10 === 0) reputationGain += 5; // Milestone

      const newReputation = prev.reputation + reputationGain;
      const { rank, emoji } = calculateRank(newReputation);

      return {
        totalScans: newTotalScans,
        bigFishFound: newBigFishFound,
        reputation: newReputation,
        rank,
        rankEmoji: emoji,
      };
    });
  };

  /**
   * Reset profile (for testing or user request)
   */
  const resetProfile = () => {
    setProfile({
      totalScans: 0,
      bigFishFound: 0,
      reputation: 0,
      rank: 'Minnow',
      rankEmoji: '🐟',
    });
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    profile,
    recordScan,
    resetProfile,
  };
}
