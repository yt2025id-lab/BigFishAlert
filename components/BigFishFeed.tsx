'use client';

import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BigFishActivity } from '@/lib/solana/types';
import { getTimeAgo, formatCurrency, truncateAddress } from '@/lib/utils';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface BigFishFeedProps {
  language: 'en' | 'id';
}

export function BigFishFeed({ language }: BigFishFeedProps) {
  const { data, error, isLoading } = useSWR('/api/big-fish-feed', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  const activities: BigFishActivity[] = data?.data || [];

  const getDirectionLabel = (type: string) => {
    if (language === 'id') {
      return type === 'SELL' ? 'Berenang Keluar' : 'Berenang Masuk';
    }
    return type === 'SELL' ? 'Swimming Out' : 'Swimming In';
  };

  const getDirectionColor = (type: string) => {
    return type === 'SELL' ? 'text-red-400' : 'text-green-400';
  };

  const getDirectionEmoji = (type: string) => {
    return type === 'SELL' ? '🔴' : '🟢';
  };

  return (
    <Card className="card-glow bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-ocean-50">
          🌊 {language === 'en' ? 'Live Ocean Activity' : 'Aktivitas Lautan Langsung'}
          <Badge variant="destructive" className="animate-pulse ml-auto">
            LIVE
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="text-center py-8 text-ocean-300">
            {language === 'en' ? 'Loading big fish movements...' : 'Memuat pergerakan ikan besar...'}
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-400">
            {language === 'en' ? 'Failed to load activity' : 'Gagal memuat aktivitas'}
          </div>
        )}

        {!isLoading && !error && activities.length === 0 && (
          <div className="text-center py-8 text-ocean-300">
            {language === 'en'
              ? 'No big fish activity detected yet...'
              : 'Belum ada aktivitas ikan besar terdeteksi...'}
          </div>
        )}

        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={activity.signature}
              className="flex items-center gap-3 p-4 bg-ocean-950/40 rounded-lg hover:bg-ocean-950/60 transition-all border border-ocean-800/30 hover:border-ocean-700/50"
            >
              {/* Fish Icon */}
              <div className="text-3xl flex-shrink-0">{activity.emoji}</div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0">
                {/* Top Row: Fish Size & Direction */}
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-ocean-100 border-ocean-600">
                    {activity.fishSize}
                  </Badge>
                  <span className={`text-sm font-semibold ${getDirectionColor(activity.type)}`}>
                    {getDirectionEmoji(activity.type)} {getDirectionLabel(activity.type)}
                  </span>
                </div>

                {/* Middle Row: Token & Amount */}
                <div className="font-semibold text-ocean-100">
                  {formatCurrency(activity.usdValue)}
                  <span className="text-ocean-400 ml-2 font-normal">
                    {activity.tokenSymbol}
                  </span>
                </div>

                {/* Bottom Row: Wallet & Time */}
                <div className="flex items-center gap-3 text-xs text-ocean-400 mt-1">
                  <span className="font-mono">{truncateAddress(activity.walletAddress, 3)}</span>
                  <span>•</span>
                  <span>{getTimeAgo(activity.timestamp)}</span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                activity.type === 'SELL' ? 'bg-red-500' : 'bg-green-500'
              } animate-pulse`} />
            </div>
          ))}
        </div>

        {activities.length > 0 && (
          <div className="mt-4 text-center text-xs text-ocean-400">
            {language === 'en'
              ? `Showing ${activities.length} recent big fish movements`
              : `Menampilkan ${activities.length} pergerakan ikan besar terkini`}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
