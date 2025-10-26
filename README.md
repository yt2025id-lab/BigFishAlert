# 🐟 BigFishAlert

**Track the Big Fish in Crypto Ocean**

Real-time whale monitoring platform that protects retail traders from market manipulation on Solana.

![BigFishAlert Banner](https://img.shields.io/badge/Solana-Devnet-blueviolet) ![Next.js](https://img.shields.io/badge/Next.js-16.0-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Anchor](https://img.shields.io/badge/Anchor-0.29-orange)

---

## 🌊 Overview

BigFishAlert adalah platform pemantauan whale (paus/ikan besar) real-time yang melindungi trader ritel dari manipulasi pasar di Solana blockchain. Dengan menggunakan metafora laut yang mudah dipahami, kami membuat analisis on-chain menjadi accessible untuk semua orang.

### The Problem

Retail traders (small fish) di crypto kehilangan uang karena:
- 🐋 Big fish (whales) bergerak dengan jutaan dollar tanpa terlihat
- 🎯 Rug pulls terjadi ketika holder besar keluar tiba-tiba
- 📊 Data on-chain terlalu kompleks untuk user biasa
- 🌍 Language barrier (kebanyakan tools hanya English)

### The Solution

**BigFishAlert** = Your fishing radar yang:
- ✅ Melacak pergerakan big fish secara real-time
- ✅ Alert ketika whale mulai "berenang pergi"
- ✅ Memberikan skor risiko 0-100 untuk setiap token
- ✅ Penjelasan AI menggunakan metafora laut
- ✅ Bilingual: English + Bahasa Indonesia
- ✅ On-chain reputation system (trustless)

---

## 🚀 Features

### 1. 🔍 Token Scanner
Cast your net pada token Solana manapun:
- Input token address → Get instant analysis
- **Big Fish Score** (0-100) berdasarkan:
  - Konsentrasi holder (35%)
  - Aktivitas whale terkini (30%)
  - Kedalaman likuiditas (20%)
  - Security score (10%)
  - Volume anomaly (5%)
- Lihat Top 10 holders (the big fish)
- AI explanation dalam bahasa sederhana

### 2. 🌊 Ocean Monitor
Scan seluruh portfolio Anda:
- Auto-detect token di wallet
- Alert jika big fish sedang leaving
- Color-coded risk levels (🔴 🟡 🟢)
- One-click view semua holdings

### 3. 📊 Live Big Fish Activity
Track whale movements real-time:
- Transaksi > $50K USD
- Kategorisasi: 🐋 Whale, 🦈 Shark, 🐬 Dolphin, 🐟 Big Fish
- Lihat token mana yang whales sedang masuki/keluar
- Update setiap 30 detik

### 4. 👑 Fisher Reputation (On-Chain)
Earn reputation saat Anda scan:
- Setiap scan = +10 REP
- Menemukan big fish = +50 REP
- Ranks:
  - 🐟 **Minnow** (0-100 REP)
  - 🎣 **Fisher** (101-500 REP)
  - ⚓ **Captain** (501-1000 REP)
  - 👑 **Admiral** (1001+ REP)
- Leaderboard master fishers
- Data tersimpan di blockchain (immutable)

### 5. 🌍 Bilingual AI
Toggle antara bahasa:
- 🇺🇸 English
- 🇮🇩 Bahasa Indonesia
- Ocean metaphors yang universal

---

## 🛠 Tech Stack

### Frontend
```
- Next.js 16 (App Router) + TypeScript
- Tailwind CSS (ocean-themed design)
- shadcn/ui components
- Framer Motion (animations)
- @solana/wallet-adapter-react
- @solana/web3.js
- SWR (data fetching)
```

### Blockchain
```
- Solana Devnet
- Anchor Framework 0.29 (Rust)
- Helius RPC & Webhooks
- On-chain Fisher Reputation program
```

### AI & Data
```
- OpenAI GPT-4 (AI explanations)
- Dexscreener API (market data)
- Rugcheck API (security scores)
- Helius DAS API (holder data)
```

---

## 📦 Installation

### Prerequisites
- Node.js 18+ dan npm/yarn
- Rust & Cargo (untuk Anchor)
- Solana CLI
- Anchor CLI

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/bigfishalert.git
cd bigfishalert
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_api_key
NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_PROGRAM_ID=your_deployed_program_id
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔧 Build & Deploy Anchor Program

### Build Program
```bash
anchor build
```

### Deploy to Devnet
```bash
anchor deploy --provider.cluster devnet
```

### Get Program ID
```bash
solana address -k target/deploy/bigfishalert-keypair.json
```

Copy Program ID ke `.env.local`:
```env
NEXT_PUBLIC_PROGRAM_ID=<your_program_id>
```

---

## 🎮 Usage Guide

### 1. Connect Wallet
- Click **"Connect Wallet"** di header
- Pilih Phantom atau Solflare
- Approve connection

### 2. Scan Token
- Paste alamat token Solana di input field
- Click **"Cast Net"** 🎣
- Lihat Big Fish Score + AI explanation

### 3. Monitor Portfolio
- Wallet terconnect otomatis scan holdings
- Lihat mana token yang berisiko tinggi
- Get alerts untuk whale movements

### 4. Earn Reputation
- Setiap scan akan terecord on-chain
- Accumulate reputation points
- Climb the leaderboard

---

## 🏗 Project Structure

```
bigfishalert/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── scan-token/       # Token scanner endpoint
│   │   ├── scan-ocean/       # Portfolio scanner
│   │   └── big-fish-activity/# Whale tracking
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   └── WalletProvider.tsx    # Solana wallet context
├── lib/
│   ├── solana/               # Solana utilities
│   │   ├── config.ts
│   │   └── types.ts
│   ├── i18n/                 # Translations
│   │   └── translations.ts
│   └── utils.ts              # Helper functions
├── programs/
│   └── bigfishalert/         # Anchor program
│       ├── src/
│       │   └── lib.rs        # Smart contract
│       └── Cargo.toml
├── Anchor.toml               # Anchor configuration
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── package.json
```

---

## 🔐 Security

- **No Private Keys Stored**: Menggunakan wallet adapter
- **On-Chain Verification**: Reputation stored di blockchain
- **Read-Only API Keys**: Public RPC endpoints
- **Client-Side Scanning**: No sensitive data di server

---

## 🌟 Why BigFishAlert Wins

### 1. Consumer-Focused
Ocean metaphor yang semua orang mengerti - tidak perlu background teknikal

### 2. Bilingual
Melayani pasar Indonesia (250M+ populasi) yang underserved oleh English-only tools

### 3. Solana-Native
Menggunakan Anchor, wallet adapter, on-chain data secara native

### 4. Real Utility
Mencegah actual losses dari whale dumps - bukan hanya spekulasi

### 5. Viral Mechanics
Built-in sharing + leaderboard = natural growth

---

## 🗺 Roadmap

### Phase 1 (Post-Hackathon)
- [ ] Telegram bot untuk instant alerts
- [ ] Mobile-responsive improvements
- [ ] More language support (Spanish, Chinese)

### Phase 2 (Q2 2025)
- [ ] Historical big fish pattern analysis
- [ ] Token watchlist feature
- [ ] Browser extension
- [ ] Discord integration

### Phase 3 (Q3 2025)
- [ ] Premium tier dengan advanced analytics
- [ ] DAO governance untuk fisher community
- [ ] Cross-chain expansion (Ethereum, Base)

---

## 👥 Team

Built with ❤️ for **Solana Cypherpunk Hackathon 2025**

- **Developer**: [Your Name]
- **Track**: Consumer Apps (hosted by Raydium)

---

## 📄 License

MIT License - feel free to fork and build!

---

## 🙏 Acknowledgments

- Solana Foundation
- Raydium (Consumer Apps track sponsor)
- Helius (RPC & APIs)
- OpenAI (GPT-4)
- Anchor community

---

## 📞 Contact

- **Website**: https://bigfishalert.xyz
- **Twitter**: [@bigfishalert](https://twitter.com/bigfishalert)
- **GitHub**: [github.com/yourusername/bigfishalert](https://github.com/yourusername/bigfishalert)
- **Email**: hello@bigfishalert.xyz

---

<div align="center">

### 🐟 Protecting small fish from big fish since 2025

**[Live Demo](https://bigfishalert.xyz)** • **[Video](https://youtube.com/...)** • **[Docs](https://docs.bigfishalert.xyz)**

</div>
