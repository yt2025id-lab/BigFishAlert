export interface TokenHolder {
  address: string;
  balance: number;
  percentage: number;
  uiAmount: number;
}

export interface BigFishScore {
  score: number;
  holderConcentration: number;
  recentActivity: number;
  liquidityDepth: number;
  securityScore: number;
  volumeAnomaly: number;
}

export interface TokenAnalysis {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  bigFishScore: BigFishScore;
  topHolders: TokenHolder[];
  totalSupply: number;
  price: number;
  liquidity: number;
  volume24h: number;
  priceChange24h: number;
  marketCap: number;
  rugCheckScore?: number;
  aiExplanation?: string;
}

export interface BigFishActivity {
  signature: string;
  timestamp: number;
  tokenAddress: string;
  tokenSymbol: string;
  type: 'BUY' | 'SELL';
  amount: number;
  usdValue: number;
  walletAddress: string;
  fishSize: 'WHALE' | 'SHARK' | 'DOLPHIN' | 'BIG_FISH';
  emoji: string;
}

export interface FisherAccount {
  wallet: string;
  totalCatches: number;
  bigFishSpotted: number;
  reputation: number;
  rank: 'Minnow' | 'Fisher' | 'Captain' | 'Admiral';
}

export interface OceanMonitorToken {
  tokenAddress: string;
  tokenSymbol: string;
  tokenName: string;
  balance: number;
  usdValue: number;
  bigFishScore: number;
  alert: boolean;
  status: string;
  topHolders: TokenHolder[];
}

export interface LanguageTranslations {
  en: { [key: string]: string };
  id: { [key: string]: string };
}
