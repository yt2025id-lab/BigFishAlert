/**
 * Helius API Integration
 * Real-time Solana token data fetching using Helius DAS API
 */

import { Connection, PublicKey } from '@solana/web3.js';

const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';

// Use MAINNET-BETA for production (real token data)
const HELIUS_RPC_URL = `https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`;

// Fallback to public mainnet RPC if no API key
const RPC_URL = HELIUS_API_KEY
  ? HELIUS_RPC_URL
  : 'https://api.mainnet-beta.solana.com';

export const connection = new Connection(RPC_URL, 'confirmed');

export interface HeliusTokenMetadata {
  mint: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: string;
  logoURI?: string;
}

export interface HeliusHolder {
  owner: string;
  amount: string;
  decimals: number;
  uiAmount: number;
}

/**
 * Fetch token metadata using multiple sources
 * 1. Try Metaplex metadata (standard for SPL tokens)
 * 2. Fallback to basic mint info
 */
export async function getTokenMetadata(mintAddress: string): Promise<HeliusTokenMetadata | null> {
  try {
    const mint = new PublicKey(mintAddress);

    // Try to get Metaplex metadata account
    try {
      const METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

      // Derive metadata PDA (Program Derived Address)
      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from('metadata'),
          METADATA_PROGRAM_ID.toBuffer(),
          mint.toBuffer(),
        ],
        METADATA_PROGRAM_ID
      );

      const metadataAccount = await connection.getAccountInfo(metadataPDA);

      if (metadataAccount) {
        // Parse Metaplex metadata (simplified parsing)
        const data = metadataAccount.data;

        // Metaplex metadata structure (simplified):
        // 1 byte: key
        // 32 bytes: update authority
        // 32 bytes: mint
        // Then name (4 bytes length + string)
        // Then symbol (4 bytes length + string)

        let offset = 1 + 32 + 32; // Skip key, update authority, mint

        // Read name
        const nameLength = data.readUInt32LE(offset);
        offset += 4;
        const name = data.slice(offset, offset + nameLength).toString('utf8').replace(/\0/g, '').trim();
        offset += nameLength;

        // Read symbol
        const symbolLength = data.readUInt32LE(offset);
        offset += 4;
        const symbol = data.slice(offset, offset + symbolLength).toString('utf8').replace(/\0/g, '').trim();

        // Get mint info for decimals and supply
        const mintInfo = await connection.getParsedAccountInfo(mint);
        let decimals = 9;
        let supply = '0';

        if (mintInfo.value && 'parsed' in mintInfo.value.data) {
          const parsed = mintInfo.value.data.parsed;
          decimals = parsed.info.decimals || 9;
          supply = parsed.info.supply || '0';
        }

        if (name && symbol) {
          return {
            mint: mintAddress,
            name,
            symbol,
            decimals,
            supply,
          };
        }
      }
    } catch (metadataError) {
      console.log('Metaplex metadata not found, trying fallback...');
    }

    // Fallback: Use standard Solana RPC for mint info only
    const mintInfo = await connection.getParsedAccountInfo(mint);

    if (mintInfo.value && 'parsed' in mintInfo.value.data) {
      const parsed = mintInfo.value.data.parsed;
      return {
        mint: mintAddress,
        name: '', // Empty, will be filled by Dexscreener fallback
        symbol: '', // Empty, will be filled by Dexscreener fallback
        decimals: parsed.info.decimals || 9,
        supply: parsed.info.supply || '0',
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching token metadata:', error);
    return null;
  }
}

/**
 * Fetch top token holders using Helius DAS API
 */
export async function getTopHolders(mintAddress: string, limit = 10): Promise<HeliusHolder[]> {
  try {
    const mint = new PublicKey(mintAddress);

    // Fallback: Use getProgramAccounts (works on mainnet)
    const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

    const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, {
      filters: [
        { dataSize: 165 },
        { memcmp: { offset: 0, bytes: mint.toBase58() } },
      ],
    });

    const holders = accounts
      .map((account) => {
        if ('parsed' in account.account.data) {
          const parsed = account.account.data.parsed;
          const info = parsed.info;
          return {
            owner: info.owner,
            amount: info.tokenAmount.amount,
            decimals: info.tokenAmount.decimals,
            uiAmount: info.tokenAmount.uiAmount || 0,
          };
        }
        return null;
      })
      .filter((holder): holder is HeliusHolder => holder !== null)
      .sort((a, b) => b.uiAmount - a.uiAmount)
      .slice(0, limit);

    return holders;
  } catch (error) {
    console.error('Error fetching top holders:', error);
    return [];
  }
}

/**
 * Fetch recent large transactions for a token
 */
export async function getRecentTransactions(
  mintAddress: string,
  limit = 20
): Promise<any[]> {
  try {
    const mint = new PublicKey(mintAddress);

    if (HELIUS_API_KEY) {
      const response = await fetch(`https://mainnet.helius-rpc.com/?api-key=${HELIUS_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'recent-txs',
          method: 'getSignaturesForAsset',
          params: {
            id: mintAddress,
            limit,
          },
        }),
      });

      const data = await response.json();
      return data.result || [];
    }

    // Fallback: Basic signature fetching
    const signatures = await connection.getSignaturesForAddress(mint, { limit });
    return signatures;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

/**
 * Get token account balance for a wallet
 */
export async function getTokenBalance(
  walletAddress: string,
  mintAddress: string
): Promise<number> {
  try {
    const wallet = new PublicKey(walletAddress);
    const mint = new PublicKey(mintAddress);

    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet, {
      mint,
    });

    if (tokenAccounts.value.length > 0) {
      const account = tokenAccounts.value[0];
      if ('parsed' in account.account.data) {
        return account.account.data.parsed.info.tokenAmount.uiAmount || 0;
      }
    }

    return 0;
  } catch (error) {
    console.error('Error fetching token balance:', error);
    return 0;
  }
}

/**
 * Validate if a string is a valid Solana address
 */
export function isValidSolanaAddress(address: string): boolean {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
}
