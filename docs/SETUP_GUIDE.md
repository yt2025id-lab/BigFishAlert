# 🐟 BigFishAlert - Panduan Setup Lengkap

Panduan step-by-step untuk menjalankan BigFishAlert di local development environment.

---

## 📋 Prerequisites

Pastikan Anda sudah menginstall:

- ✅ **Node.js** 18+ ([Download](https://nodejs.org/))
- ✅ **npm** atau **yarn**
- ✅ **Git**
- ✅ **WSL2** (untuk Windows) atau Terminal (Mac/Linux)

### Optional (untuk Anchor development):
- Rust & Cargo
- Solana CLI
- Anchor CLI

---

## 🚀 Quick Start (5 Menit)

### 1. Clone Repository
```bash
cd /mnt/c/Users/T470/Documents/hackathon2025/Big\ Fish\ Alert/bigfishalert
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` dan tambahkan API keys:

```env
# Helius (FREE - Daftar di helius.dev)
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key_here
NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_api_key

# OpenAI (Diperlukan untuk AI explanations)
OPENAI_API_KEY=sk-your_openai_api_key_here

# Solana Network
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open Browser
Buka [http://localhost:3000](http://localhost:3000)

---

## 🔑 Mendapatkan API Keys (GRATIS!)

### 1. Helius API Key (GRATIS - Recommended)

**Kenapa Helius?**
- 100 requests/second (free tier)
- Enhanced Solana RPC
- Token metadata API
- Webhook support

**Cara daftar:**
1. Kunjungi [https://helius.dev](https://helius.dev)
2. Click "Get Started" → Sign up dengan Google/GitHub
3. Buat project baru
4. Copy API Key dari dashboard
5. Paste ke `.env.local`:
   ```env
   NEXT_PUBLIC_HELIUS_API_KEY=xxxxxx
   NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=xxxxxx
   ```

### 2. OpenAI API Key (BERBAYAR - Optional)

**Untuk apa?**
- AI-powered whale analysis dalam bahasa Indonesia & English
- Ocean metaphor explanations

**Cara daftar:**
1. Kunjungi [https://platform.openai.com](https://platform.openai.com)
2. Sign up / Login
3. Go to API Keys → Create new secret key
4. Copy key dan paste ke `.env.local`:
   ```env
   OPENAI_API_KEY=sk-xxxxxx
   ```

**💡 Tips:**
- OpenAI memberikan $5 free credit untuk new users
- GPT-4 cost: ~$0.03 per 1K tokens
- Untuk demo, ~100 scans = $0.50

**Alternative (Jika tidak punya OpenAI):**
App akan menggunakan fallback explanation yang sudah hardcoded (lihat `api/ai-explain/route.ts`)

---

## 📁 Project Structure

```
bigfishalert/
├── app/
│   ├── api/
│   │   ├── scan-token/      # Token analysis API
│   │   ├── scan-ocean/      # Portfolio scanner
│   │   ├── big-fish-feed/   # Whale activity feed
│   │   └── ai-explain/      # AI explanations
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Ocean theme styles
│
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── WalletProvider.tsx   # Solana wallet context
│   ├── TokenScanner.tsx     # Token scanner component
│   └── BigFishFeed.tsx      # Live activity feed
│
├── lib/
│   ├── scoring/
│   │   └── bigFishAlgorithm.ts  # Scoring logic
│   ├── solana/
│   │   ├── config.ts        # Solana config
│   │   └── types.ts         # TypeScript types
│   ├── i18n/
│   │   └── translations.ts  # EN/ID translations
│   └── utils.ts             # Helper functions
│
├── programs/
│   └── bigfishalert/        # Anchor smart contract
│       └── src/lib.rs       # Fisher Reputation system
│
├── .env.local               # Environment variables (JANGAN COMMIT!)
├── package.json
├── tailwind.config.ts
└── next.config.js
```

---

## 🎨 Features yang Sudah Implementasi

### ✅ Frontend
- [x] Ocean-themed UI dengan wave animations
- [x] Solana wallet integration (Phantom/Solflare)
- [x] Bilingual support (EN/ID)
- [x] Responsive design
- [x] Dark mode ocean theme

### ✅ Backend APIs
- [x] `/api/scan-token` - Token analysis dengan big fish scoring
- [x] `/api/scan-ocean` - Portfolio scanner
- [x] `/api/big-fish-feed` - Live whale activity
- [x] `/api/ai-explain` - AI explanations (GPT-4)

### ✅ Big Fish Scoring Algorithm
- [x] Holder Concentration (35%)
- [x] Recent Big Fish Activity (30%)
- [x] Liquidity Depth (20%)
- [x] Security Score (10%)
- [x] Volume Anomaly (5%)

### ✅ Smart Contract (Anchor)
- [x] Fisher Reputation System
- [x] On-chain stats tracking
- [x] Rank progression (Minnow → Fisher → Captain → Admiral)

---

## 🧪 Testing

### Test Token Scanner
1. Connect wallet (Phantom recommended)
2. Gunakan alamat token Solana, contoh:
   - **SOL**: `So11111111111111111111111111111111111111112`
   - **USDC**: `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`
   - **BONK**: `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`

3. Klik "Cast Net" untuk scan

### Test Big Fish Feed
- Feed akan auto-refresh setiap 30 detik
- Menampilkan transaksi > $50K USD

---

## 🔧 Build & Deploy Anchor Program (Optional)

Jika ingin deploy smart contract ke Devnet:

### 1. Install Anchor
```bash
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
```

### 2. Generate Keypair
```bash
solana-keygen new --outfile ~/.config/solana/id.json
```

### 3. Airdrop SOL (Devnet)
```bash
solana airdrop 5 --url devnet
```

### 4. Build Program
```bash
anchor build
```

### 5. Deploy to Devnet
```bash
anchor deploy --provider.cluster devnet
```

### 6. Get Program ID
```bash
solana address -k target/deploy/bigfishalert-keypair.json
```

### 7. Update .env.local
```env
NEXT_PUBLIC_PROGRAM_ID=<your_program_id>
```

---

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
```bash
# Kill process di port 3000
npx kill-port 3000

# Atau gunakan port lain
npm run dev -- --port 3001
```

### Wallet tidak connect
1. Install Phantom wallet extension
2. Switch ke Devnet di wallet settings
3. Refresh page

### API errors
1. Cek `.env.local` sudah benar
2. Cek API keys valid
3. Cek network connection

### TypeScript errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📖 API Documentation

### POST /api/scan-token
Scan token untuk big fish analysis

**Request:**
```json
{
  "tokenAddress": "So11111111111111111111111111111111111111112"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "tokenAddress": "So11...",
    "tokenSymbol": "SOL",
    "bigFishScore": {
      "score": 45,
      "holderConcentration": 38,
      "recentActivity": 52,
      "liquidityDepth": 25,
      "securityScore": 85,
      "volumeAnomaly": 30
    },
    "topHolders": [...],
    "liquidity": 50000000,
    "volume24h": 10000000
  }
}
```

### POST /api/scan-ocean
Scan wallet portfolio

**Request:**
```json
{
  "walletAddress": "7xKXt..."
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "tokenAddress": "...",
      "tokenSymbol": "SOL",
      "bigFishScore": 45,
      "alert": false,
      "status": "🟢 Ocean Calm"
    }
  ],
  "summary": {
    "totalTokens": 5,
    "highRiskTokens": 0,
    "mediumRiskTokens": 1,
    "lowRiskTokens": 4
  }
}
```

### GET /api/big-fish-feed
Get recent whale activities

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "tokenSymbol": "SOL",
      "type": "SELL",
      "usdValue": 2500000,
      "fishSize": "WHALE",
      "emoji": "🐋",
      "timestamp": 1234567890
    }
  ]
}
```

---

## 🎯 Development Tips

### Hot Reload
Next.js auto-reload ketika file berubah. Tidak perlu restart server.

### Debug Mode
```bash
# Lihat detailed logs
npm run dev

# Build production untuk testing
npm run build
npm start
```

### Database (Optional)
Untuk production, recommended:
- **Redis** (Upstash) untuk big fish feed caching
- **PostgreSQL** (Vercel Postgres) untuk user data

---

## 🚀 Deploy to Production

### Deploy Frontend ke Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables di Vercel
1. Go to Project Settings → Environment Variables
2. Add semua variables dari `.env.local`
3. Redeploy

---

## 📞 Support

Jika ada masalah:
1. Check [GitHub Issues](https://github.com/yourusername/bigfishalert/issues)
2. Baca dokumentasi lagi
3. Contact: hello@bigfishalert.xyz

---

**Happy Fishing! 🎣🐟**
