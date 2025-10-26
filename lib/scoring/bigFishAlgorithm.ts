import { BigFishScore, TokenHolder } from '@/lib/solana/types';

interface TokenData {
  tokenAddress: string;
  holders: TokenHolder[];
  totalSupply: number;
  liquidity: number;
  volume24h: number;
  price: number;
  recentTransactions?: any[];
  rugCheckScore?: number;
}

/**
 * Calculate Big Fish Score (0-100)
 * Algorithm breakdown:
 * - Holder Concentration: 35%
 * - Recent Big Fish Activity: 30%
 * - Liquidity Depth: 20%
 * - Security Score: 10%
 * - Volume Anomaly: 5%
 */
export function calculateBigFishScore(data: TokenData): BigFishScore {
  const holderScore = calculateHolderConcentration(data.holders, data.totalSupply);
  const activityScore = calculateRecentActivity(data.recentTransactions || []);
  const liquidityScore = calculateLiquidityDepth(data.liquidity, data.volume24h);
  const securityScore = data.rugCheckScore || 50; // Default if not available
  const volumeScore = calculateVolumeAnomaly(data.volume24h, data.liquidity);

  // Weighted calculation
  const finalScore = Math.round(
    holderScore * 0.35 +
    activityScore * 0.30 +
    liquidityScore * 0.20 +
    securityScore * 0.10 +
    volumeScore * 0.05
  );

  return {
    score: Math.min(Math.max(finalScore, 0), 100), // Clamp between 0-100
    holderConcentration: holderScore,
    recentActivity: activityScore,
    liquidityDepth: liquidityScore,
    securityScore: securityScore,
    volumeAnomaly: volumeScore,
  };
}

/**
 * Holder Concentration (35% of total score)
 * Red flags:
 * - Top 10 holders own >70% = HIGH RISK (score: 90-100)
 * - Top 10 holders own 50-70% = MEDIUM RISK (score: 50-89)
 * - Top 10 holders own <30% = LOW RISK (score: 0-49)
 */
function calculateHolderConcentration(holders: TokenHolder[], totalSupply: number): number {
  if (!holders || holders.length === 0) return 50; // Default medium risk

  // Calculate top 10 holders percentage
  const top10Holders = holders.slice(0, 10);
  const top10Percentage = top10Holders.reduce((sum, holder) => sum + holder.percentage, 0);

  // Score calculation (inverse - higher concentration = higher score/risk)
  if (top10Percentage > 70) {
    // Very high concentration - scale from 70% to 100%
    return 70 + ((top10Percentage - 70) / 30) * 30;
  } else if (top10Percentage > 50) {
    // Medium concentration - scale from 50% to 70%
    return 40 + ((top10Percentage - 50) / 20) * 30;
  } else if (top10Percentage > 30) {
    // Low-medium concentration
    return 20 + ((top10Percentage - 30) / 20) * 20;
  } else {
    // Very low concentration (good for investors)
    return (top10Percentage / 30) * 20;
  }
}

/**
 * Recent Big Fish Activity (30% of total score)
 * Analyzes last 24h transactions
 * - Large sells = DANGER (high score)
 * - Large buys = BULLISH (low score)
 * - Balanced = NEUTRAL (medium score)
 */
function calculateRecentActivity(transactions: any[]): number {
  if (!transactions || transactions.length === 0) return 50; // No data = neutral

  const last24h = Date.now() - 24 * 60 * 60 * 1000;
  const recentTxs = transactions.filter(tx => tx.timestamp > last24h);

  if (recentTxs.length === 0) return 50;

  let sellValue = 0;
  let buyValue = 0;

  recentTxs.forEach(tx => {
    if (tx.type === 'SELL' && tx.usdValue > 50000) {
      sellValue += tx.usdValue;
    } else if (tx.type === 'BUY' && tx.usdValue > 50000) {
      buyValue += tx.usdValue;
    }
  });

  const totalValue = sellValue + buyValue;
  if (totalValue === 0) return 50;

  // Calculate sell pressure ratio
  const sellRatio = sellValue / totalValue;

  // High sell pressure = high risk score
  if (sellRatio > 0.7) {
    // Heavy selling
    return 70 + (sellRatio - 0.7) / 0.3 * 30;
  } else if (sellRatio > 0.5) {
    // Moderate selling
    return 50 + (sellRatio - 0.5) / 0.2 * 20;
  } else if (sellRatio < 0.3) {
    // Heavy buying (good sign)
    return sellRatio / 0.3 * 30;
  } else {
    // Balanced
    return 30 + (sellRatio - 0.3) / 0.2 * 20;
  }
}

/**
 * Liquidity Depth (20% of total score)
 * Can big fish exit without crashing the price?
 * - Low liquidity vs high volume = HIGH RISK
 * - High liquidity = LOW RISK
 */
function calculateLiquidityDepth(liquidity: number, volume24h: number): number {
  if (!liquidity || liquidity === 0) return 100; // No liquidity = max risk

  // Calculate liquidity to volume ratio
  const liquidityRatio = liquidity / (volume24h || 1);

  // Good ratio: liquidity > 5x daily volume
  // Bad ratio: liquidity < daily volume

  if (liquidityRatio > 5) {
    // Excellent liquidity
    return 10;
  } else if (liquidityRatio > 2) {
    // Good liquidity
    return 10 + (5 - liquidityRatio) / 3 * 20;
  } else if (liquidityRatio > 1) {
    // Moderate liquidity
    return 30 + (2 - liquidityRatio) * 30;
  } else if (liquidityRatio > 0.5) {
    // Low liquidity
    return 60 + (1 - liquidityRatio) / 0.5 * 20;
  } else {
    // Very low liquidity (危険!)
    return 80 + (0.5 - liquidityRatio) / 0.5 * 20;
  }
}

/**
 * Volume Anomaly (5% of total score)
 * Detect unusual spikes that might indicate manipulation
 */
function calculateVolumeAnomaly(volume24h: number, liquidity: number): number {
  if (!volume24h || !liquidity) return 50;

  const volumeToLiquidityRatio = volume24h / liquidity;

  // Normal ratio: 0.1 - 0.5
  // Suspicious: > 2.0 (volume way higher than liquidity)

  if (volumeToLiquidityRatio > 3) {
    // Extreme volume spike - very suspicious
    return 90;
  } else if (volumeToLiquidityRatio > 2) {
    // High volume spike
    return 70 + (volumeToLiquidityRatio - 2) * 20;
  } else if (volumeToLiquidityRatio > 1) {
    // Moderate spike
    return 50 + (volumeToLiquidityRatio - 1) * 20;
  } else if (volumeToLiquidityRatio < 0.01) {
    // Suspiciously low volume
    return 60;
  } else {
    // Normal volume
    return 20;
  }
}

/**
 * Get risk level based on score
 */
export function getRiskLevel(score: number): {
  level: 'LOW' | 'MEDIUM' | 'HIGH';
  label: string;
  color: string;
  emoji: string;
} {
  if (score >= 70) {
    return {
      level: 'HIGH',
      label: 'DANGER - Big Fish Leaving',
      color: 'red',
      emoji: '🔴',
    };
  } else if (score >= 50) {
    return {
      level: 'MEDIUM',
      label: 'CAUTION - Watch Carefully',
      color: 'yellow',
      emoji: '🟡',
    };
  } else {
    return {
      level: 'LOW',
      label: 'SAFE - Calm Waters',
      color: 'green',
      emoji: '🟢',
    };
  }
}

/**
 * Get fish emoji based on score
 */
export function getFishEmoji(score: number): string {
  if (score >= 90) return '🐋'; // Whale alert
  if (score >= 70) return '🦈'; // Shark
  if (score >= 50) return '🐬'; // Dolphin
  if (score >= 30) return '🐟'; // Big fish
  return '🐠'; // Small fish
}
