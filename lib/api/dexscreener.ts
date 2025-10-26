/**
 * Dexscreener API Integration
 * Fetch real-time market data (price, liquidity, volume)
 */

export interface DexscreenerPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
  };
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
  };
}

export interface DexscreenerResponse {
  pairs: DexscreenerPair[];
}

/**
 * Fetch token market data from Dexscreener
 */
export async function getTokenMarketData(
  tokenAddress: string
): Promise<DexscreenerPair | null> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Dexscreener API error:', response.statusText);
      return null;
    }

    const data: DexscreenerResponse = await response.json();

    // Return the pair with highest liquidity
    if (data.pairs && data.pairs.length > 0) {
      const sortedPairs = data.pairs.sort(
        (a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0)
      );
      return sortedPairs[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching Dexscreener data:', error);
    return null;
  }
}

/**
 * Get price in USD for a token
 */
export async function getTokenPrice(tokenAddress: string): Promise<number> {
  const data = await getTokenMarketData(tokenAddress);
  return data?.priceUsd ? parseFloat(data.priceUsd) : 0;
}

/**
 * Get liquidity in USD for a token
 */
export async function getTokenLiquidity(tokenAddress: string): Promise<number> {
  const data = await getTokenMarketData(tokenAddress);
  return data?.liquidity?.usd || 0;
}

/**
 * Get 24h volume for a token
 */
export async function getToken24hVolume(tokenAddress: string): Promise<number> {
  const data = await getTokenMarketData(tokenAddress);
  return data?.volume?.h24 || 0;
}

/**
 * Get 24h price change percentage
 */
export async function getTokenPriceChange24h(tokenAddress: string): Promise<number> {
  const data = await getTokenMarketData(tokenAddress);
  return data?.priceChange?.h24 || 0;
}
