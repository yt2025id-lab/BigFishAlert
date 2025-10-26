import { NextRequest, NextResponse } from 'next/server';
import { BigFishActivity } from '@/lib/solana/types';
import { getFishSizeLabel } from '@/lib/utils';

/**
 * Get Big Fish Activity Feed
 * Returns recent whale transactions > $50K
 */
export async function GET(request: NextRequest) {
  try {
    // In production, this would fetch from Redis cache or database
    // For now, we'll generate mock data for demonstration

    const activities = await fetchBigFishActivities();

    return NextResponse.json({
      success: true,
      data: activities,
      count: activities.length,
    });
  } catch (error) {
    console.error('Error fetching big fish feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch big fish activity' },
      { status: 500 }
    );
  }
}

/**
 * Webhook endpoint for Helius to send transaction updates
 */
export async function POST(request: NextRequest) {
  try {
    const webhookData = await request.json();

    // Verify webhook signature (in production)
    // const signature = request.headers.get('x-helius-signature');

    // Process incoming transactions
    const transactions = webhookData.transactions || [];
    const bigFishTxs = filterBigFishTransactions(transactions);

    // Store in Redis/Database for the feed
    // await storeBigFishTransactions(bigFishTxs);

    return NextResponse.json({
      success: true,
      processed: bigFishTxs.length,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

/**
 * Filter transactions to find big fish (>$50K)
 */
function filterBigFishTransactions(transactions: any[]): BigFishActivity[] {
  return transactions
    .filter(tx => {
      // Filter for large transactions
      const usdValue = calculateTransactionValue(tx);
      return usdValue >= 50000;
    })
    .map(tx => {
      const usdValue = calculateTransactionValue(tx);
      const fishSize = getFishSizeLabel(usdValue);

      return {
        signature: tx.signature,
        timestamp: tx.timestamp * 1000,
        tokenAddress: tx.tokenTransfers[0]?.mint || '',
        tokenSymbol: tx.tokenTransfers[0]?.symbol || 'UNKNOWN',
        type: tx.type === 'SWAP_SELL' ? 'SELL' : 'BUY',
        amount: tx.tokenTransfers[0]?.amount || 0,
        usdValue,
        walletAddress: tx.feePayer || '',
        fishSize: fishSize.label as any,
        emoji: fishSize.emoji,
      };
    });
}

/**
 * Calculate USD value of transaction
 */
function calculateTransactionValue(tx: any): number {
  // This would need actual price data
  // For now, using mock calculation
  return tx.tokenTransfers?.[0]?.usdValue || 0;
}

/**
 * Fetch recent big fish activities
 * In production: fetch from Redis sorted set
 */
async function fetchBigFishActivities(): Promise<BigFishActivity[]> {
  // Mock data for demonstration
  // In production, this would query Redis: ZRANGE big-fish-feed 0 99 REV

  const now = Date.now();
  const mockActivities: BigFishActivity[] = [
    {
      signature: '5KHxJ...',
      timestamp: now - 5 * 60 * 1000, // 5 mins ago
      tokenAddress: 'So11111111111111111111111111111111111111112',
      tokenSymbol: 'SOL',
      type: 'SELL',
      amount: 50000,
      usdValue: 2500000,
      walletAddress: '7xKXt...',
      fishSize: 'WHALE',
      emoji: '🐋',
    },
    {
      signature: '3MNbQ...',
      timestamp: now - 15 * 60 * 1000, // 15 mins ago
      tokenAddress: 'EPjFW...',
      tokenSymbol: 'BONK',
      type: 'BUY',
      amount: 1000000000,
      usdValue: 850000,
      walletAddress: '9pKLm...',
      fishSize: 'SHARK',
      emoji: '🦈',
    },
    {
      signature: '8HjKL...',
      timestamp: now - 30 * 60 * 1000, // 30 mins ago
      tokenAddress: 'mSoLz...',
      tokenSymbol: 'mSOL',
      type: 'SELL',
      amount: 25000,
      usdValue: 650000,
      walletAddress: '4RtYu...',
      fishSize: 'SHARK',
      emoji: '🦈',
    },
    {
      signature: '2GfPq...',
      timestamp: now - 45 * 60 * 1000, // 45 mins ago
      tokenAddress: 'JUPyP...',
      tokenSymbol: 'JUP',
      type: 'BUY',
      amount: 500000,
      usdValue: 250000,
      walletAddress: '6TyUi...',
      fishSize: 'DOLPHIN',
      emoji: '🐬',
    },
    {
      signature: '9LmNk...',
      timestamp: now - 60 * 60 * 1000, // 1 hour ago
      tokenAddress: 'RaydP...',
      tokenSymbol: 'RAY',
      type: 'SELL',
      amount: 75000,
      usdValue: 180000,
      walletAddress: '3WqAs...',
      fishSize: 'DOLPHIN',
      emoji: '🐬',
    },
  ];

  return mockActivities;
}
