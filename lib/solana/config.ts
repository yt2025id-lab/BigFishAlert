import { clusterApiUrl, Connection, PublicKey } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const SOLANA_NETWORK = (process.env.NEXT_PUBLIC_SOLANA_NETWORK as WalletAdapterNetwork) || WalletAdapterNetwork.Devnet;

export const SOLANA_RPC_HOST =
  process.env.NEXT_PUBLIC_SOLANA_RPC_HOST ||
  clusterApiUrl(SOLANA_NETWORK);

export const connection = new Connection(SOLANA_RPC_HOST, 'confirmed');

export const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '';
export const HELIUS_RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL || '';

// Program ID will be set after deployment
export const PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID
  ? new PublicKey(process.env.NEXT_PUBLIC_PROGRAM_ID)
  : null;

// Whale threshold (in USD)
export const WHALE_THRESHOLD = 50000;

// Big fish holder percentage thresholds
export const RISK_THRESHOLDS = {
  HIGH: 70,    // Top 10 holders own >70%
  MEDIUM: 50,  // Top 10 holders own 50-70%
  LOW: 30,     // Top 10 holders own <30%
};

// Fisher rank thresholds
export const FISHER_RANKS = {
  MINNOW: { min: 0, max: 100, label: 'Minnow' },
  FISHER: { min: 101, max: 500, label: 'Fisher' },
  CAPTAIN: { min: 501, max: 1000, label: 'Captain' },
  ADMIRAL: { min: 1001, max: Infinity, label: 'Admiral' },
};

// Reputation points
export const REPUTATION_POINTS = {
  REGULAR_SCAN: 10,
  BIG_FISH_FOUND: 50,
};
