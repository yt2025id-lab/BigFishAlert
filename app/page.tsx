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
import { useFisherProfile } from '@/lib/hooks/useFisherProfile';

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { isDegen } = useTheme();
  const [tokenAddress, setTokenAddress] = useState('');
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const { profile, recordScan } = useFisherProfile();

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
          <TokenScanner language={language} connected={connected} onScanComplete={recordScan} />
        </div>

        {/* Stats Section */}
        {connected && publicKey && (
          <Card className="max-w-3xl mx-auto mt-8 card-glow bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-ocean-50">
                <Trophy className="w-5 h-5" />
                {language === 'en' ? 'Your Fisher Profile' : 'Profil Nelayan Anda'}
              </CardTitle>
              <CardDescription className="text-ocean-300 mt-2">
                {language === 'en'
                  ? 'Track your progress as a whale hunter. Scan tokens to earn reputation and rank up!'
                  : 'Lacak progres Anda sebagai pemburu paus. Scan token untuk dapat reputasi dan naik peringkat!'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-ocean-950/50 hover:bg-ocean-950/70 transition-colors group">
                  <div className="text-3xl mb-2">{profile.rankEmoji}</div>
                  <div className="text-2xl font-bold text-ocean-100">{profile.rank}</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Rank' : 'Peringkat'}
                  </div>
                  <div className="text-xs text-ocean-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en'
                      ? 'Level up: Minnow → Dolphin (100) → Whale (500) → Kraken (1000)'
                      : 'Naik level: Minnow → Dolphin (100) → Whale (500) → Kraken (1000)'}
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ocean-950/50 hover:bg-ocean-950/70 transition-colors group">
                  <div className="text-3xl mb-2">🎣</div>
                  <div className="text-2xl font-bold text-ocean-100">{profile.totalScans}</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Total Scans' : 'Total Pemindaian'}
                  </div>
                  <div className="text-xs text-ocean-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en'
                      ? '+10 reputation per scan. Milestone bonus every 10 scans!'
                      : '+10 reputasi per scan. Bonus milestone tiap 10 scan!'}
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ocean-950/50 hover:bg-ocean-950/70 transition-colors group">
                  <div className="text-3xl mb-2">🐋</div>
                  <div className="text-2xl font-bold text-ocean-100">{profile.bigFishFound}</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Big Fish Found' : 'Ikan Besar Ditemukan'}
                  </div>
                  <div className="text-xs text-ocean-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en'
                      ? 'Risky tokens (score ≥60). +50 reputation bonus!'
                      : 'Token berisiko (skor ≥60). +50 bonus reputasi!'}
                  </div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ocean-950/50 hover:bg-ocean-950/70 transition-colors group">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-2xl font-bold text-ocean-100">{profile.reputation}</div>
                  <div className="text-sm text-ocean-300">
                    {language === 'en' ? 'Reputation' : 'Reputasi'}
                  </div>
                  <div className="text-xs text-ocean-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en'
                      ? 'Total reputation points. Earn by scanning and finding big fish!'
                      : 'Total poin reputasi. Dapatkan dengan scan dan temukan ikan besar!'}
                  </div>
                </div>
              </div>

              {/* AI Progress Explanation */}
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <div className="text-lg">🤖</div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-blue-400 mb-1">
                      {language === 'en' ? 'AI Fisher Assistant' : 'Asisten Nelayan AI'}
                    </div>
                    <div className="text-sm text-ocean-200">
                      {profile.totalScans === 0
                        ? language === 'en'
                          ? "Welcome, new fisher! 🎣 Start scanning tokens to build your reputation. Each scan earns +10 points. Finding risky tokens (Big Fish) gives you a +50 bonus! You're currently a Minnow - scan tokens to level up to Dolphin (100 rep), Whale (500 rep), or legendary Kraken (1000 rep)!"
                          : 'Selamat datang, nelayan baru! 🎣 Mulai scan token untuk bangun reputasi. Tiap scan dapat +10 poin. Menemukan token berisiko (Big Fish) dapat bonus +50! Kamu sekarang Minnow - scan token untuk naik ke Dolphin (100 rep), Whale (500 rep), atau Kraken legendaris (1000 rep)!'
                        : profile.rank === 'Minnow'
                        ? language === 'en'
                          ? `Nice work! You've scanned ${profile.totalScans} token${profile.totalScans > 1 ? 's' : ''} and found ${profile.bigFishFound} risky token${profile.bigFishFound !== 1 ? 's' : ''}. Keep going! You need ${100 - profile.reputation} more reputation to become a Dolphin 🐬. Pro tip: Finding Big Fish (risky tokens) gives 5x more reputation!`
                          : `Bagus! Kamu sudah scan ${profile.totalScans} token dan menemukan ${profile.bigFishFound} token berisiko. Lanjutkan! Kamu butuh ${100 - profile.reputation} reputasi lagi untuk jadi Dolphin 🐬. Tips: Menemukan Big Fish (token berisiko) dapat 5x lebih banyak reputasi!`
                        : profile.rank === 'Dolphin'
                        ? language === 'en'
                          ? `Impressive, Dolphin 🐬! You're an experienced hunter with ${profile.totalScans} scans and ${profile.bigFishFound} big fish caught. Only ${500 - profile.reputation} reputation until you become a Whale! You're in the top tier of fishers. Keep scanning to reach legendary Whale status!`
                          : `Hebat, Dolphin 🐬! Kamu pemburu berpengalaman dengan ${profile.totalScans} scan dan ${profile.bigFishFound} ikan besar tertangkap. Tinggal ${500 - profile.reputation} reputasi lagi jadi Whale! Kamu sudah masuk tier atas. Lanjut scan untuk capai status Whale legendaris!`
                        : profile.rank === 'Whale'
                        ? language === 'en'
                          ? `Legendary Whale 🐋! You're a master hunter with ${profile.totalScans} scans and ${profile.bigFishFound} big fish found. Only ${1000 - profile.reputation} reputation to reach ultimate Kraken status! You're dominating the crypto ocean. Few fishers reach this level!`
                          : `Whale Legendaris 🐋! Kamu master pemburu dengan ${profile.totalScans} scan dan ${profile.bigFishFound} ikan besar ditemukan. Tinggal ${1000 - profile.reputation} reputasi lagi capai status Kraken ultimate! Kamu mendominasi samudra kripto. Sedikit nelayan capai level ini!`
                        : language === 'en'
                        ? `🦑 KRAKEN ACHIEVED! You're the ultimate crypto hunter with ${profile.totalScans} total scans and ${profile.bigFishFound} big fish discovered. You've mastered the art of whale detection. You're in the elite 1% of fishers. Keep scanning to maintain your dominance!`
                        : `🦑 KRAKEN TERCAPAI! Kamu pemburu kripto ultimate dengan ${profile.totalScans} total scan dan ${profile.bigFishFound} ikan besar ditemukan. Kamu sudah master seni deteksi paus. Kamu di elit 1% nelayan. Lanjut scan untuk pertahankan dominasi!`}
                    </div>
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
