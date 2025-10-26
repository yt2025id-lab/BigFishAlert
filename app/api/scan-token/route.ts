import { NextRequest, NextResponse } from 'next/server';
import { PublicKey } from '@solana/web3.js';
import { calculateBigFishScore, getRiskLevel } from '@/lib/scoring/bigFishAlgorithm';
import { TokenAnalysis, TokenHolder } from '@/lib/solana/types';
import { getTokenMetadata, getTopHolders, connection } from '@/lib/api/helius';
import { getTokenMarketData } from '@/lib/api/dexscreener';
import { getSecurityScore } from '@/lib/api/rugcheck';

export async function POST(request: NextRequest) {
  try {
    const { tokenAddress } = await request.json();

    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'Token address is required' },
        { status: 400 }
      );
    }

    // Validate Solana address
    try {
      new PublicKey(tokenAddress);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid Solana address' },
        { status: 400 }
      );
    }

    // Fetch token data from multiple sources in parallel
    const [tokenMetadata, holders, marketData, securityScore] = await Promise.allSettled([
      getTokenMetadata(tokenAddress),
      getTopHolders(tokenAddress, 10),
      getTokenMarketData(tokenAddress),
      getSecurityScore(tokenAddress),
    ]);

    // Extract data from settled promises
    const metadata = tokenMetadata.status === 'fulfilled' ? tokenMetadata.value : null;
    const holdersList = holders.status === 'fulfilled' ? holders.value : [];
    const market = marketData.status === 'fulfilled' ? marketData.value : null;
    const rugCheckScore = securityScore.status === 'fulfilled' ? securityScore.value : 50;

    // Fallback: Use Dexscreener data for name/symbol if metadata is empty
    let tokenName = metadata?.name?.trim() || '';
    let tokenSymbol = metadata?.symbol?.trim() || '';

    // If either is empty, try Dexscreener as fallback
    if ((!tokenName || !tokenSymbol) && market?.baseToken) {
      if (!tokenName) tokenName = market.baseToken.name || '';
      if (!tokenSymbol) tokenSymbol = market.baseToken.symbol || '';
    }

    // Final fallback to Unknown
    if (!tokenName || tokenName === '') tokenName = 'Unknown Token';
    if (!tokenSymbol || tokenSymbol === '') tokenSymbol = 'UNKNOWN';

    // Convert total supply from string to number
    const totalSupply = metadata?.supply ? parseFloat(metadata.supply) : 0;

    // Convert holders to TokenHolder format with percentage
    const formattedHolders: TokenHolder[] = holdersList.map((holder) => {
      const percentage = totalSupply > 0 ? (holder.uiAmount / totalSupply) * 100 : 0;
      return {
        address: holder.owner,
        balance: parseFloat(holder.amount),
        percentage,
        uiAmount: holder.uiAmount,
      };
    });

    // Calculate Big Fish Score
    const bigFishScore = calculateBigFishScore({
      tokenAddress,
      holders: formattedHolders,
      totalSupply,
      liquidity: market?.liquidity?.usd || 0,
      volume24h: market?.volume?.h24 || 0,
      price: parseFloat(market?.priceUsd || '0'),
      recentTransactions: [], // Will implement separately
      rugCheckScore,
    });

    const riskLevel = getRiskLevel(bigFishScore.score);

    // Prepare response
    const analysis: TokenAnalysis = {
      tokenAddress,
      tokenName, // Use fallback-enhanced name
      tokenSymbol, // Use fallback-enhanced symbol
      bigFishScore,
      topHolders: formattedHolders.slice(0, 10),
      totalSupply,
      price: parseFloat(market?.priceUsd || '0'),
      liquidity: market?.liquidity?.usd || 0,
      volume24h: market?.volume?.h24 || 0,
      priceChange24h: market?.priceChange?.h24 || 0,
      marketCap: 0, // Can calculate from price * supply
      rugCheckScore,
    };

    return NextResponse.json({
      success: true,
      data: analysis,
      riskLevel,
    });
  } catch (error) {
    console.error('Error scanning token:', error);
    return NextResponse.json(
      { error: 'Failed to scan token. Please try again.' },
      { status: 500 }
    );
  }
}
