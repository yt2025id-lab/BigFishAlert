/**
 * Test Token Scanner with Real Data
 * Run: npx ts-node scripts/test-scanner.ts
 */

import { getTokenMetadata, getTopHolders } from '../lib/api/helius';
import { getTokenMarketData } from '../lib/api/dexscreener';
import { getSecurityScore } from '../lib/api/rugcheck';

const TEST_TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
};

async function testTokenScanner(tokenAddress: string, tokenName: string) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 Testing: ${tokenName}`);
  console.log(`Address: ${tokenAddress}`);
  console.log('='.repeat(60));

  try {
    // Test 1: Token Metadata
    console.log('\n📋 Fetching Token Metadata...');
    const metadata = await getTokenMetadata(tokenAddress);
    if (metadata) {
      console.log(`✅ Name: ${metadata.name}`);
      console.log(`✅ Symbol: ${metadata.symbol}`);
      console.log(`✅ Decimals: ${metadata.decimals}`);
      console.log(`✅ Supply: ${metadata.supply}`);
    } else {
      console.log('❌ Failed to fetch metadata');
    }

    // Test 2: Top Holders
    console.log('\n🐋 Fetching Top 10 Holders...');
    const holders = await getTopHolders(tokenAddress, 10);
    if (holders && holders.length > 0) {
      console.log(`✅ Found ${holders.length} holders`);
      console.log('\nTop 3 Holders:');
      holders.slice(0, 3).forEach((holder, i) => {
        console.log(`  ${i + 1}. ${holder.owner.slice(0, 8)}... - ${holder.uiAmount.toLocaleString()} tokens`);
      });
    } else {
      console.log('❌ No holders found (may be normal for wrapped tokens)');
    }

    // Test 3: Market Data
    console.log('\n💰 Fetching Market Data from Dexscreener...');
    const market = await getTokenMarketData(tokenAddress);
    if (market) {
      console.log(`✅ Price: $${market.priceUsd}`);
      console.log(`✅ Liquidity: $${market.liquidity.usd.toLocaleString()}`);
      console.log(`✅ Volume 24h: $${market.volume.h24.toLocaleString()}`);
      console.log(`✅ Price Change 24h: ${market.priceChange.h24.toFixed(2)}%`);
    } else {
      console.log('❌ No market data found');
    }

    // Test 4: Security Score
    console.log('\n🔒 Fetching Security Score from Rugcheck...');
    const securityScore = await getSecurityScore(tokenAddress);
    console.log(`✅ Security Score: ${securityScore}/100 ${securityScore < 30 ? '(Safe)' : securityScore < 70 ? '(Caution)' : '(Risky)'}`);

    console.log(`\n✅ All tests completed for ${tokenName}!`);
  } catch (error) {
    console.error(`\n❌ Error testing ${tokenName}:`, error);
  }
}

async function runAllTests() {
  console.log('\n🚀 BigFishAlert Token Scanner Test Suite');
  console.log('Testing with real Solana mainnet tokens...\n');

  // Test each token
  await testTokenScanner(TEST_TOKENS.SOL, 'Wrapped SOL');
  await testTokenScanner(TEST_TOKENS.USDC, 'USD Coin');
  await testTokenScanner(TEST_TOKENS.BONK, 'Bonk');

  console.log('\n' + '='.repeat(60));
  console.log('🎉 All tests completed!');
  console.log('='.repeat(60));
  console.log('\nℹ️  If you see ❌ errors:');
  console.log('   1. Check your API keys in .env.local');
  console.log('   2. Restart dev server: npm run dev');
  console.log('   3. Some APIs may be rate-limited\n');
}

// Run tests
runAllTests().catch(console.error);
