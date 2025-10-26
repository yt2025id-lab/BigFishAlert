import { NextRequest, NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { calculateBigFishScore } from '@/lib/scoring/bigFishAlgorithm';
import { OceanMonitorToken } from '@/lib/solana/types';

const HELIUS_RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL || 'https://api.devnet.solana.com';

export async function POST(request: NextRequest) {
  try {
    const { walletAddress } = await request.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      );
    }

    // Validate wallet address
    try {
      new PublicKey(walletAddress);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      );
    }

    // Get all token accounts for this wallet
    const connection = new Connection(HELIUS_RPC_URL);
    const walletPubkey = new PublicKey(walletAddress);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletPubkey, {
      programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
    });

    if (tokenAccounts.value.length === 0) {
      return NextResponse.json({
        success: true,
        data: [],
        message: 'No tokens found in wallet',
      });
    }

    // Scan each token for big fish risk
    const oceanReport: OceanMonitorToken[] = await Promise.all(
      tokenAccounts.value.map(async (tokenAccount) => {
        const accountData = tokenAccount.account.data.parsed.info;
        const tokenMint = accountData.mint;
        const balance = accountData.tokenAmount.uiAmount;

        try {
          // Fetch token data (parallel requests)
          const [holderData, marketData] = await Promise.allSettled([
            fetchTokenHolders(tokenMint),
            fetchTokenMarketData(tokenMint),
          ]);

          const holders = holderData.status === 'fulfilled' ? holderData.value : [];
          const market = marketData.status === 'fulfilled' ? marketData.value : null;

          // Calculate big fish score
          const bigFishScore = calculateBigFishScore({
            tokenAddress: tokenMint,
            holders,
            totalSupply: market?.totalSupply || 0,
            liquidity: market?.liquidity || 0,
            volume24h: market?.volume24h || 0,
            price: market?.price || 0,
            recentTransactions: [],
          });

          // Check if big fish are leaving (high risk)
          const bigFishLeaving = bigFishScore.score > 70;

          return {
            tokenAddress: tokenMint,
            tokenSymbol: market?.symbol || 'UNKNOWN',
            tokenName: market?.name || 'Unknown Token',
            balance,
            usdValue: balance * (market?.price || 0),
            bigFishScore: bigFishScore.score,
            alert: bigFishLeaving,
            status: bigFishLeaving
              ? '🔴 Big Fish Swimming Away!'
              : bigFishScore.score > 50
                ? '🟡 Watch Carefully'
                : '🟢 Ocean Calm',
            topHolders: holders.slice(0, 10),
          };
        } catch (error) {
          console.error(`Error scanning token ${tokenMint}:`, error);
          return {
            tokenAddress: tokenMint,
            tokenSymbol: 'ERROR',
            tokenName: 'Error Loading',
            balance,
            usdValue: 0,
            bigFishScore: 0,
            alert: false,
            status: '⚠️ Error',
            topHolders: [],
          };
        }
      })
    );

    // Sort by risk (highest risk first)
    const sortedReport = oceanReport.sort((a, b) => b.bigFishScore - a.bigFishScore);

    return NextResponse.json({
      success: true,
      data: sortedReport,
      summary: {
        totalTokens: sortedReport.length,
        highRiskTokens: sortedReport.filter(t => t.bigFishScore >= 70).length,
        mediumRiskTokens: sortedReport.filter(t => t.bigFishScore >= 50 && t.bigFishScore < 70).length,
        lowRiskTokens: sortedReport.filter(t => t.bigFishScore < 50).length,
        totalValue: sortedReport.reduce((sum, t) => sum + t.usdValue, 0),
      },
    });
  } catch (error) {
    console.error('Error scanning ocean:', error);
    return NextResponse.json(
      { error: 'Failed to scan portfolio' },
      { status: 500 }
    );
  }
}

async function fetchTokenHolders(tokenMint: string) {
  try {
    const connection = new Connection(HELIUS_RPC_URL);
    const mint = new PublicKey(tokenMint);

    const largestAccounts = await connection.getTokenLargestAccounts(mint);

    if (!largestAccounts.value || largestAccounts.value.length === 0) {
      return [];
    }

    const totalSupply = largestAccounts.value.reduce((sum, account) => {
      return sum + Number(account.amount);
    }, 0);

    return largestAccounts.value.map(account => {
      const balance = Number(account.amount);
      return {
        address: account.address.toString(),
        balance,
        percentage: (balance / totalSupply) * 100,
        uiAmount: balance / Math.pow(10, account.decimals),
      };
    });
  } catch (error) {
    return [];
  }
}

async function fetchTokenMarketData(tokenMint: string) {
  try {
    const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenMint}`);
    const data = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    const mainPair = data.pairs[0];

    return {
      name: mainPair.baseToken.name || 'Unknown',
      symbol: mainPair.baseToken.symbol || 'UNKNOWN',
      price: parseFloat(mainPair.priceUsd) || 0,
      liquidity: parseFloat(mainPair.liquidity.usd) || 0,
      volume24h: parseFloat(mainPair.volume.h24) || 0,
      totalSupply: 0, // Would need additional API call
    };
  } catch (error) {
    return null;
  }
}
