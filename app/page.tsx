'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Waves, Activity, Trophy, Fish } from 'lucide-react';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LiveTicker } from '@/components/degen/LiveTicker';
import { SocialProof } from '@/components/degen/SocialProof';
import { TokenScanner } from '@/components/TokenScanner';
import { getDegenText } from '@/lib/i18n/degenSpeak';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { isDegen } = useTheme();
  const [tokenAddress, setTokenAddress] = useState('');
  const [language, setLanguage] = useState<'en' | 'id'>('en');

  return (
    <main className="min-h-screen ocean-bg">
      {/* Wave Animation Background */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Live Ticker - Degen Mode Only */}
      {isDegen && <LiveTicker />}

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-pulse">🐟</div>
              <div>
                <h1 className={`text-2xl font-bold ${isDegen ? 'gradient-text uppercase tracking-wider' : 'gradient-text'}`}>
                  BigFishAlert
                  {isDegen && <span className="ml-2 text-[#00FF41]">🚀</span>}
                </h1>
                <p className="text-sm text-blue-200">
                  {isDegen
                    ? getDegenText('tagline', language)
                    : 'Track the Big Fish in Crypto Ocean'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Language Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={language === 'en' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('en')}
                >
                  🇺🇸 EN
                </Button>
                <Button
                  variant={language === 'id' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setLanguage('id')}
                >
                  🇮🇩 ID
                </Button>
              </div>

              {/* Wallet Button */}
              <WalletMultiButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Social Proof - Degen Mode Only */}
        {isDegen && <SocialProof />}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4 fish-swim">🐋</div>
          <h2 className={`text-4xl font-bold mb-4 gradient-text ${isDegen ? 'text-5xl uppercase tracking-wide' : ''}`}>
            {isDegen
              ? getDegenText('heroTitle', language)
              : (language === 'en'
                ? 'Track the Big Fish in Crypto Ocean'
                : 'Lacak Ikan Besar di Lautan Kripto')}
          </h2>
          <p className={`text-xl text-blue-100 max-w-2xl mx-auto ${isDegen ? 'font-bold text-2xl' : ''}`}>
            {isDegen
              ? getDegenText('heroSubtitle', language)
              : (language === 'en'
                ? 'Real-time whale monitoring that protects retail traders from market manipulation'
                : 'Pemantauan paus real-time yang melindungi pedagang ritel dari manipulasi pasar')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="card-glow bg-gradient-to-br from-ocean-900/50 to-ocean-800/50 border-ocean-700">
            <CardHeader>
              <div className="text-3xl mb-2">🔍</div>
              <CardTitle className="text-ocean-100">
                {language === 'en' ? 'Token Scanner' : 'Pemindai Token'}
              </CardTitle>
              <CardDescription className="text-ocean-300">
                {language === 'en'
                  ? 'Analyze any Solana token for whale activity'
                  : 'Analisis token Solana untuk aktivitas paus'}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-glow bg-gradient-to-br from-ocean-900/50 to-ocean-800/50 border-ocean-700">
            <CardHeader>
              <div className="text-3xl mb-2">🌊</div>
              <CardTitle className="text-ocean-100">
                {language === 'en' ? 'Ocean Monitor' : 'Monitor Lautan'}
              </CardTitle>
              <CardDescription className="text-ocean-300">
                {language === 'en'
                  ? 'Track your entire portfolio for risks'
                  : 'Lacak seluruh portofolio untuk risiko'}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-glow bg-gradient-to-br from-ocean-900/50 to-ocean-800/50 border-ocean-700">
            <CardHeader>
              <div className="text-3xl mb-2">📊</div>
              <CardTitle className="text-ocean-100">
                {language === 'en' ? 'Live Activity' : 'Aktivitas Langsung'}
              </CardTitle>
              <CardDescription className="text-ocean-300">
                {language === 'en'
                  ? 'See whale movements in real-time'
                  : 'Lihat pergerakan paus secara real-time'}
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="card-glow bg-gradient-to-br from-ocean-900/50 to-ocean-800/50 border-ocean-700">
            <CardHeader>
              <div className="text-3xl mb-2">👑</div>
              <CardTitle className="text-ocean-100">
                {language === 'en' ? 'Fisher Rank' : 'Peringkat Nelayan'}
              </CardTitle>
              <CardDescription className="text-ocean-300">
                {language === 'en'
                  ? 'Earn reputation on-chain'
                  : 'Dapatkan reputasi on-chain'}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Token Scanner */}
        <div className="max-w-3xl mx-auto">
          <TokenScanner language={language} connected={connected} />
        </div>

        {/* Stats Section */}
        {connected && publicKey && (
          <Card className="max-w-3xl mx-auto mt-8 card-glow bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-ocean-50">
                <Trophy className="w-5 h-5" />
                {language === 'en' ? 'Your Fisher Profile' : 'Profil Nelayan Anda'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-ocean-950/50">
                  <div className="text-3xl mb-2">🐟</div>
                  <div className="text-2xl font-bold text-ocean-100">0</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Rank: Minnow' : 'Peringkat: Ikan Kecil'}
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ocean-950/50">
                  <div className="text-3xl mb-2">🎣</div>
                  <div className="text-2xl font-bold text-ocean-100">0</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Total Scans' : 'Total Pemindaian'}
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ocean-950/50">
                  <div className="text-3xl mb-2">🐋</div>
                  <div className="text-2xl font-bold text-ocean-100">0</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Big Fish Found' : 'Ikan Besar Ditemukan'}
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ocean-950/50">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-ocean-100">0</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Reputation' : 'Reputasi'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-ocean-200">
          <p>
            🐟 Built with ❤️ for Solana Cypherpunk Hackathon 2025
          </p>
          <p className="text-sm mt-2 text-ocean-400">
            {language === 'en'
              ? 'Protecting small fish from big fish since 2025'
              : 'Melindungi ikan kecil dari ikan besar sejak 2025'}
          </p>
        </div>
      </footer>
    </main>
  );
}
