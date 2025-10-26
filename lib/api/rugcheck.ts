/**
 * Rugcheck API Integration
 * Fetch security scores and risk analysis
 */

export interface RugcheckReport {
  mint: string;
  score: number; // 0-100 (higher = more risky)
  risks: {
    name: string;
    description: string;
    level: 'info' | 'warn' | 'danger';
    score: number;
  }[];
  markets: {
    marketCap: number;
    liquidity: number;
    lpLocked: boolean;
    lpLockedPct: number;
  };
  tokenMeta: {
    name: string;
    symbol: string;
    decimals: number;
    supply: string;
  };
  topHolders: {
    address: string;
    pct: number;
    amount: string;
  }[];
}

/**
 * Fetch Rugcheck security report
 */
export async function getRugcheckReport(
  tokenAddress: string
): Promise<RugcheckReport | null> {
  try {
    const response = await fetch(
      `https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Rugcheck API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Rugcheck data:', error);
    return null;
  }
}

/**
 * Get simplified security score (0-100, lower is safer)
 */
export async function getSecurityScore(tokenAddress: string): Promise<number> {
  const report = await getRugcheckReport(tokenAddress);

  if (!report) {
    // Return medium risk if no data available
    return 50;
  }

  // Rugcheck score is 0-100 where higher = more risky
  // We'll use it directly
  return Math.min(Math.max(report.score || 50, 0), 100);
}

/**
 * Check if LP is locked
 */
export async function isLiquidityLocked(tokenAddress: string): Promise<boolean> {
  const report = await getRugcheckReport(tokenAddress);
  return report?.markets?.lpLocked || false;
}

/**
 * Get top holder concentration percentage
 */
export async function getTopHolderConcentration(
  tokenAddress: string
): Promise<number> {
  const report = await getRugcheckReport(tokenAddress);

  if (!report?.topHolders || report.topHolders.length === 0) {
    return 0;
  }

  // Sum top 10 holders percentage
  const top10Pct = report.topHolders
    .slice(0, 10)
    .reduce((sum, holder) => sum + holder.pct, 0);

  return top10Pct;
}

/**
 * Get critical risk flags
 */
export async function getCriticalRisks(
  tokenAddress: string
): Promise<string[]> {
  const report = await getRugcheckReport(tokenAddress);

  if (!report?.risks) {
    return [];
  }

  return report.risks
    .filter((risk) => risk.level === 'danger')
    .map((risk) => risk.name);
}
