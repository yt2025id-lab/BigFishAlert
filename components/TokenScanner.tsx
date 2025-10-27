'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2, AlertTriangle } from 'lucide-react';
import { TokenAnalysis } from '@/lib/solana/types';
import { getFishEmoji, formatCurrency, truncateAddress } from '@/lib/utils';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { getDegenText } from '@/lib/i18n/degenSpeak';
import { RiskSpeedometer } from '@/components/degen/RiskSpeedometer';
import { AIWhalePrediction } from '@/components/AIWhalePrediction';

interface TokenScannerProps {
  language: 'en' | 'id';
  connected: boolean;
  onScanComplete?: (bigFishScore: number) => void; // Callback to update fisher profile
}

export function TokenScanner({ language, connected, onScanComplete }: TokenScannerProps) {
  const { isDegen } = useTheme();
  const [tokenAddress, setTokenAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TokenAnalysis | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleScan = async () => {
    if (!tokenAddress.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    setAiExplanation('');

    try {
      // Scan token
      const scanResponse = await fetch('/api/scan-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tokenAddress: tokenAddress.trim() }),
      });

      if (!scanResponse.ok) {
        throw new Error('Failed to scan token');
      }

      const scanData = await scanResponse.json();
      setResult(scanData.data);

      // Notify parent component about successful scan (for fisher profile tracking)
      if (onScanComplete && scanData.data?.bigFishScore?.score) {
        onScanComplete(scanData.data.bigFishScore.score);
      }

      // Get AI explanation
      const aiResponse = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bigFishScore: scanData.data.bigFishScore,
          language,
          tokenSymbol: scanData.data.tokenSymbol,
          topHolders: scanData.data.topHolders,
        }),
      });

      if (aiResponse.ok) {
        const aiData = await aiResponse.json();
        setAiExplanation(aiData.explanation);
      }
    } catch (err: any) {
      console.error('Scan error:', err);

      let errorMessage = '';

      if (err.message?.includes('Invalid public key')) {
        errorMessage = language === 'en'
          ? 'Invalid Solana address! Please paste the full token address (44 characters).'
          : 'Alamat Solana tidak valid! Paste alamat token lengkap (44 karakter).';
      } else if (err.message?.includes('Network')) {
        errorMessage = language === 'en'
          ? 'Network error. Please check your internet connection.'
          : 'Error jaringan. Periksa koneksi internet Anda.';
      } else {
        errorMessage = language === 'en'
          ? `Failed to scan token: ${err.message || 'Unknown error'}. Please try again.`
          : `Gagal memindai token: ${err.message || 'Error tidak diketahui'}. Coba lagi.`;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'bg-red-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getRiskLabel = (score: number) => {
    if (language === 'id') {
      if (score >= 70) return 'BAHAYA';
      if (score >= 50) return 'HATI-HATI';
      return 'AMAN';
    } else {
      if (score >= 70) return 'DANGER';
      if (score >= 50) return 'CAUTION';
      return 'SAFE';
    }
  };

  return (
    <div className="space-y-6">
      {/* Scanner Input */}
      <Card className="card-glow bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-ocean-50">
            <Search className="w-6 h-6" />
            {language === 'en' ? 'Scan Token for Big Fish' : 'Pindai Token untuk Ikan Besar'}
          </CardTitle>
          <CardDescription className="text-ocean-200">
            {language === 'en'
              ? 'Enter any Solana token address to check for whale activity'
              : 'Masukkan alamat token Solana untuk memeriksa aktivitas paus'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder={
                language === 'en'
                  ? 'Token address (e.g., So11111...)'
                  : 'Alamat token (mis., So11111...)'
              }
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && handleScan()}
              className="bg-ocean-950/50 border-ocean-700 text-ocean-50 placeholder:text-ocean-400"
              disabled={loading}
            />
            <Button
              size="lg"
              disabled={!tokenAddress.trim() || loading}
              onClick={handleScan}
              className={isDegen ? "fishing-rod px-8 py-6 text-lg font-black uppercase" : "fishing-rod"}
              style={isDegen ? {
                background: 'linear-gradient(135deg, #00FF41 0%, #00D9FF 100%)',
                boxShadow: '0 0 30px rgba(0, 255, 65, 0.6), 0 0 60px rgba(0, 217, 255, 0.4)',
                border: '2px solid #00FF41',
                color: '#0A0E27',
              } : undefined}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  {isDegen ? getDegenText('scanning', language) : (language === 'en' ? 'Scanning...' : 'Memindai...')}
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  {isDegen ? getDegenText('castNet', language) : (language === 'en' ? 'Cast Net' : 'Lempar Jala')}
                </>
              )}
            </Button>
          </div>

          {!connected && (
            <p className="text-center text-sm text-ocean-300 mt-4">
              {isDegen
                ? (language === 'en' ? '⚡ You can scan without wallet ser!' : '⚡ Bisa scan tanpa wallet bro!')
                : (language === 'en'
                  ? '💡 Tip: You can scan tokens without connecting wallet'
                  : '💡 Tips: Anda bisa scan token tanpa hubungkan wallet')}
            </p>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {result && (
        <Card className="card-glow bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-ocean-50 flex items-center gap-2">
                  {getFishEmoji(result.bigFishScore.score)} {result.tokenSymbol}
                </CardTitle>
                <CardDescription className="text-ocean-200">
                  {result.tokenName}
                </CardDescription>
              </div>
              <Badge className={`${getRiskColor(result.bigFishScore.score)} text-white px-4 py-2 text-lg`}>
                {getRiskLabel(result.bigFishScore.score)}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Big Fish Score - Dramatic Speedometer */}
            <RiskSpeedometer score={result.bigFishScore.score} language={language} />

            {/* AI Explanation */}
            {aiExplanation && (
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <p className="text-ocean-100 leading-relaxed">{aiExplanation}</p>
              </div>
            )}

            {/* AI Whale Prediction - NEW! */}
            {result.topHolders && result.topHolders.length > 0 && (
              <AIWhalePrediction
                topHolders={result.topHolders}
                tokenData={{
                  liquidity: result.liquidity,
                  volume24h: result.volume24h,
                  price: result.price,
                  tokenSymbol: result.tokenSymbol,
                }}
                language={language}
              />
            )}

            {/* Whale Risk Verdict - Clear and Prominent */}
            <Card className="bg-gradient-to-br from-ocean-900/80 to-ocean-800/80 border-ocean-600">
              <CardContent className="pt-6">
                {result.bigFishScore.holderConcentration > 70 ? (
                  <div className="p-6 rounded-lg bg-red-500/20 border-2 border-red-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-4xl">🚨</div>
                      <div>
                        <div className="text-2xl font-black text-red-400 uppercase">
                          {language === 'en' ? 'DANGER - Whale Controlled' : 'BAHAYA - Dikontrol Paus'}
                        </div>
                        <div className="text-sm text-red-200">
                          {language === 'en'
                            ? `Top holders own ${result.bigFishScore.holderConcentration.toFixed(0)}% of supply. HIGH RUG RISK!`
                            : `Holder teratas menguasai ${result.bigFishScore.holderConcentration.toFixed(0)}% supply. RISIKO RUG TINGGI!`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-red-200">
                      {language === 'en'
                        ? '⚠️ Whales can dump and crash the price anytime. Proceed with extreme caution!'
                        : '⚠️ Paus bisa dump dan hancurkan harga kapan saja. Lanjutkan dengan sangat hati-hati!'}
                    </div>
                  </div>
                ) : result.bigFishScore.holderConcentration > 50 ? (
                  <div className="p-6 rounded-lg bg-yellow-500/20 border-2 border-yellow-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-4xl">⚠️</div>
                      <div>
                        <div className="text-2xl font-black text-yellow-400 uppercase">
                          {language === 'en' ? 'CAUTION - Whale Risk Detected' : 'HATI-HATI - Risiko Paus Terdeteksi'}
                        </div>
                        <div className="text-sm text-yellow-200">
                          {language === 'en'
                            ? `Top holders own ${result.bigFishScore.holderConcentration.toFixed(0)}% of supply. Medium risk.`
                            : `Holder teratas menguasai ${result.bigFishScore.holderConcentration.toFixed(0)}% supply. Risiko sedang.`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-yellow-200">
                      {language === 'en'
                        ? '⚠️ Significant whale concentration. Watch for large movements before investing.'
                        : '⚠️ Konsentrasi paus signifikan. Awasi pergerakan besar sebelum investasi.'}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-lg bg-green-500/20 border-2 border-green-500">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-4xl">✅</div>
                      <div>
                        <div className="text-2xl font-black text-green-400 uppercase">
                          {language === 'en' ? 'SAFE - Well Distributed' : 'AMAN - Terdistribusi Baik'}
                        </div>
                        <div className="text-sm text-green-200">
                          {language === 'en'
                            ? `Top holders own ${result.bigFishScore.holderConcentration.toFixed(0)}% of supply. Decentralized!`
                            : `Holder teratas menguasai ${result.bigFishScore.holderConcentration.toFixed(0)}% supply. Terdesentralisasi!`}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-green-200">
                      {language === 'en'
                        ? '✅ Good token distribution. Lower risk of whale manipulation.'
                        : '✅ Distribusi token bagus. Risiko manipulasi paus lebih rendah.'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <MetricCard
                label={language === 'en' ? 'Holder Concentration' : 'Konsentrasi Pemegang'}
                value={result.bigFishScore.holderConcentration}
                max={100}
                description={
                  language === 'en'
                    ? 'Higher = More tokens held by top wallets (risky if >70)'
                    : 'Lebih tinggi = Token lebih banyak di wallet besar (berisiko jika >70)'
                }
              />
              <MetricCard
                label={language === 'en' ? 'Recent Activity' : 'Aktivitas Terkini'}
                value={result.bigFishScore.recentActivity}
                max={100}
                description={
                  language === 'en'
                    ? 'Trading volume in last 24h. Higher = More active'
                    : 'Volume trading 24 jam terakhir. Lebih tinggi = Lebih aktif'
                }
              />
              <MetricCard
                label={language === 'en' ? 'Liquidity Depth' : 'Kedalaman Likuiditas'}
                value={result.bigFishScore.liquidityDepth}
                max={100}
                description={
                  language === 'en'
                    ? 'How easy to buy/sell. Higher = Less price impact'
                    : 'Seberapa mudah beli/jual. Lebih tinggi = Dampak harga lebih kecil'
                }
              />
              <MetricCard
                label={language === 'en' ? 'Security Score' : 'Skor Keamanan'}
                value={result.bigFishScore.securityScore}
                max={100}
                description={
                  language === 'en'
                    ? 'Safety check from Rugcheck.xyz. Higher = Safer'
                    : 'Cek keamanan dari Rugcheck.xyz. Lebih tinggi = Lebih aman'
                }
              />
              <MetricCard
                label={language === 'en' ? 'Volume Anomaly' : 'Anomali Volume'}
                value={result.bigFishScore.volumeAnomaly}
                max={100}
                description={
                  language === 'en'
                    ? 'Unusual trading spike. Higher = Possible manipulation'
                    : 'Lonjakan trading tidak biasa. Lebih tinggi = Mungkin manipulasi'
                }
              />
              <MetricCard
                label={language === 'en' ? 'Liquidity' : 'Likuiditas'}
                value={formatCurrency(result.liquidity)}
                max={0}
                description={
                  language === 'en'
                    ? 'Total USD locked in pools. Higher = Better for trading'
                    : 'Total USD di pool. Lebih tinggi = Lebih baik untuk trading'
                }
              />
            </div>

            {/* Top Holders */}
            <div>
              <h3 className="text-lg font-semibold text-ocean-50 mb-3">
                {language === 'en' ? '🐋 Top 10 Big Fish' : '🐋 10 Ikan Besar Teratas'}
              </h3>
              <div className="space-y-2">
                {result.topHolders.map((holder, index) => (
                  <div
                    key={holder.address}
                    className="flex items-center justify-between p-3 rounded-lg bg-ocean-950/30 hover:bg-ocean-950/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-ocean-400 font-mono">#{index + 1}</span>
                      <span className="text-ocean-200 font-mono text-sm">
                        {truncateAddress(holder.address)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-ocean-100 font-semibold">
                        {holder.percentage.toFixed(2)}%
                      </div>
                      <div className="text-xs text-ocean-400">
                        {holder.uiAmount.toLocaleString()} tokens
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  max,
  description,
}: {
  label: string;
  value: number | string;
  max: number;
  description?: string;
}) {
  const isNumeric = typeof value === 'number';
  const percentage = isNumeric && max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="p-4 rounded-lg bg-ocean-950/30 hover:bg-ocean-950/50 transition-colors group">
      <div className="text-sm text-ocean-300 mb-1 flex items-center gap-1">
        {label}
        {description && (
          <span className="text-xs text-ocean-500 group-hover:text-ocean-400 transition-colors">
            ⓘ
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-ocean-50">
        {isNumeric ? Math.round(value) : value}
      </div>
      {description && (
        <div className="text-xs text-ocean-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {description}
        </div>
      )}
      {max > 0 && (
        <div className="mt-2 h-1.5 bg-ocean-900 rounded-full overflow-hidden">
          <div className="h-full bg-ocean-400 transition-all" style={{ width: `${percentage}%` }} />
        </div>
      )}
    </div>
  );
}
