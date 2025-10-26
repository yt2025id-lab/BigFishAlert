import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`;
  }
  return num.toFixed(2);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getRiskColor(score: number): string {
  if (score >= 70) return "text-red-500";
  if (score >= 50) return "text-yellow-500";
  return "text-green-500";
}

export function getRiskBadgeVariant(score: number): "destructive" | "default" | "secondary" {
  if (score >= 70) return "destructive";
  if (score >= 50) return "default";
  return "secondary";
}

export function getFishEmoji(score: number): string {
  if (score >= 90) return "🐋"; // Whale
  if (score >= 70) return "🦈"; // Shark
  if (score >= 50) return "🐬"; // Dolphin
  if (score >= 30) return "🐟"; // Big Fish
  return "🐠"; // Small Fish
}

export function getRankEmoji(rank: string): string {
  switch (rank) {
    case "Admiral": return "👑";
    case "Captain": return "⚓";
    case "Fisher": return "🎣";
    case "Minnow": return "🐟";
    default: return "🐠";
  }
}

export function getFishSizeLabel(usdValue: number): { label: string; emoji: string } {
  if (usdValue > 1000000) return { label: "WHALE", emoji: "🐋" };
  if (usdValue > 500000) return { label: "SHARK", emoji: "🦈" };
  if (usdValue > 100000) return { label: "DOLPHIN", emoji: "🐬" };
  return { label: "BIG FISH", emoji: "🐟" };
}

export function getDirectionEmoji(type: string): string {
  return type === "SELL" ? "🔴" : "🟢";
}
