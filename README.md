# 🐟 BigFishAlert

> **AI-Powered Solana Whale Tracker** - Protecting retail traders from market manipulation with real-time alerts and predictive AI

[![Live Demo](https://img.shields.io/badge/Demo-Live-success?style=for-the-badge&logo=vercel)](https://bigfishalert.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/yt2025id-lab/BigFishAlert)
[![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana)](https://solana.com)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-000000?style=for-the-badge&logo=next.js)](https://nextjs.org)

**Built for:** [Solana Cypherpunk Hackathon 2025](https://www.colosseum.org) | **Track:** Consumer Apps (Raydium)

---

## 📺 Demo

🎬 **[Watch Demo Video](https://youtube.com/...)** | 🌐 **[Try Live App](https://bigfishalert.vercel.app)**

![BigFishAlert Screenshot](https://via.placeholder.com/800x400/1e40af/ffffff?text=BigFishAlert+Screenshot)

---

## 🌊 The Problem

Retail traders (the "small fish") lose millions daily because:

- 🐋 **Whale movements are invisible** - Big holders dump tokens without warning
- 💸 **Rug pulls happen suddenly** - 85% concentration by top 10 holders = high risk
- 📊 **On-chain data is complex** - Reading blockchain data requires technical expertise
- 🌍 **Language barriers exist** - Most tools are English-only, excluding 5B+ non-English speakers

**Result:** Retail traders are the last to know when whales exit, losing their investment.

---

## 💡 Our Solution

**BigFishAlert** is an AI-powered whale monitoring platform that:

✅ **Tracks whale movements in real-time** - Get instant alerts when big fish move
✅ **Predicts whale behavior with AI** - GPT-4 powered dump probability analysis
✅ **Shows AI trading consensus** - 6 AI models voting on token sentiment
✅ **Explains risks in simple terms** - Ocean metaphors anyone can understand
✅ **Supports multiple languages** - English & Bahasa Indonesia (more coming)
✅ **100% on-chain verification** - Trustless data from Solana blockchain

---

## ✨ Key Features

### 🔍 1. Token Scanner
Cast your net on any Solana token and get instant whale analysis:

- **Big Fish Score (0-100)** based on:
  - 35% Holder Concentration
  - 30% Recent Whale Activity
  - 20% Liquidity Depth
  - 10% Security Score (Rugcheck)
  - 5% Volume Anomalies

- **Top 10 Whale Holders** with percentage breakdown
- **AI Ocean Guide** explaining risks in plain language

### 🤖 2. AI Whale Prediction
GPT-4 powered prediction engine that analyzes:

- **Dump Probability** (0-100%) with confidence level
- **Predicted Action** (BUY / HOLD / SELL PARTIAL)
- **Trigger Points** (e.g., "If price hits $X...")
- **Timeframe Estimate** (24-48h, 3-7 days, etc.)
- **AI Reasoning** with full transparency
- **Actionable Recommendations**

### 🏆 3. AI Trading Consensus
6 AI models compete to predict token performance:

- **DeepSeek Chat V3.1** - Currently leading with +42% return
- **GROK 4** - Second place at +38% return
- **Claude Sonnet 4.5** - Conservative HOLD strategy (+24%)
- **QWEN3 MAX** - Bullish on fundamentals (+9%)
- **GPT-5** - Bearish outlook (-24%)
- **Gemini 2.5 Pro** - Risk-off position (-28%)

**Consensus Voting:** Visual breakdown of BUY/HOLD/SELL signals

### 🎨 4. Degen Mode
Toggle between Professional and Degen themes:

**Professional Mode:**
- Clean, corporate UI
- Data-focused charts
- Subdued colors

**Degen Mode:**
- 🌟 Neon cyan/green theme
- 📊 Animated risk speedometer
- 📈 Live ticker with whale movements
- 🏅 Social proof badges ("12K+ Scans Today")
- ⚡ High-energy design for crypto natives

### 🌍 5. Bilingual Support
Full translation in:
- 🇺🇸 **English** - For global users
- 🇮🇩 **Bahasa Indonesia** - 275M+ speakers in Southeast Asia

Ocean metaphors work universally across languages!

### ⚠️ 6. Legal Disclaimers
Regulatory-compliant design with:
- **Prominent warning banners** at top of AI sections
- **Changed terminology** from "RECOMMENDATION: BUY" to "AI SIGNAL: BULLISH PATTERN"
- **Triple disclaimers** (top warning + info box + footer)
- **Educational focus** - "For informational purposes only. Not financial advice."

---

## 🛠 Tech Stack

### Frontend
```typescript
Next.js 16          // App Router with Turbopack
TypeScript 5.9      // Type safety
Tailwind CSS        // Utility-first styling
shadcn/ui           // Component library
Framer Motion       // Smooth animations
```

### Blockchain
```rust
Solana Web3.js      // Blockchain interaction
Wallet Adapter      // Phantom, Solflare, etc.
Anchor Framework    // Smart contract (Rust)
Helius RPC          // Fast devnet/mainnet access
```

### AI & APIs
```python
OpenAI GPT-4        // Whale behavior predictions
Dexscreener API     // Real-time market data
Rugcheck API        // Security analysis
Helius DAS API      // Token metadata
```

### Data Sources
- ✅ **Real on-chain data** from Solana blockchain
- ✅ **Live market prices** from Dexscreener
- ✅ **Security scores** from Rugcheck
- ✅ **Token metadata** from Metaplex standard

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Solana wallet (Phantom/Solflare)

### Installation

```bash
# Clone repository
git clone https://github.com/yt2025id-lab/BigFishAlert.git
cd BigFishAlert

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

### Environment Variables

```env
# Optional: Helius API key for faster RPC
NEXT_PUBLIC_HELIUS_API_KEY=your_key_here

# Optional: OpenAI for AI predictions
OPENAI_API_KEY=your_openai_key

# Network (devnet/mainnet-beta)
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

**Note:** App works without API keys using public RPCs and fallback logic!

---

## 📖 How to Use

### 1. Connect Wallet (Optional)
- Click "Connect Wallet" in header
- Choose Phantom or Solflare
- Approve connection

**Note:** You can scan tokens WITHOUT connecting wallet!

### 2. Scan a Token
1. Paste Solana token address (44 characters)
   - Example BONK: `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263`
2. Click **"Cast Net"** 🎣
3. View results:
   - Risk Speedometer (visual gauge)
   - AI Ocean Guide explanation
   - AI Whale Prediction (dump probability)
   - AI Trading Consensus (6 models)
   - Top 10 whale holders

### 3. Toggle Degen Mode
- Click theme toggle in header
- Switch between Professional ↔️ Degen mode
- Enjoy neon aesthetics! ⚡

### 4. Change Language
- Click language toggle (🇺🇸 / 🇮🇩)
- All text translates instantly

---

## 🏗 Project Structure

```
bigfishalert/
├── app/
│   ├── api/
│   │   ├── scan-token/          # Main scanner API
│   │   ├── ai-explain/          # GPT-4 explanations
│   │   ├── ai-predict-whale/    # Whale predictions
│   │   └── big-fish-feed/       # Live whale activity
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/
│   ├── TokenScanner.tsx         # Main scanner UI
│   ├── AIWhalePrediction.tsx    # AI prediction display
│   ├── AITradingConsensus.tsx   # AI models leaderboard
│   ├── WalletProvider.tsx       # Solana wallet context
│   ├── ThemeToggle.tsx          # Degen mode toggle
│   ├── degen/
│   │   ├── RiskSpeedometer.tsx  # Animated gauge
│   │   ├── LiveTicker.tsx       # Whale movement ticker
│   │   └── SocialProof.tsx      # Stats badges
│   └── ui/                      # shadcn components
│
├── lib/
│   ├── api/
│   │   ├── helius.ts            # Solana RPC calls
│   │   ├── dexscreener.ts       # Market data API
│   │   └── rugcheck.ts          # Security scores
│   ├── scoring/
│   │   └── bigFishAlgorithm.ts  # Risk calculation
│   ├── i18n/
│   │   ├── translations.ts      # Language files
│   │   └── degenSpeak.ts        # Degen mode text
│   └── contexts/
│       └── ThemeContext.tsx     # Theme state
│
├── programs/
│   └── bigfishalert/
│       └── src/
│           └── lib.rs           # Anchor smart contract
│
└── docs/                        # Documentation
```

---

## 🎯 What Makes This Special

### 1. Consumer-First Design
- **Ocean metaphors** make blockchain accessible to everyone
- No technical jargon - "whales swimming away" vs "large token transfers"
- Beautiful UI that doesn't look like a terminal

### 2. Unique AI Features
- **GPT-4 Whale Predictions** - Industry-first dump probability analysis
- **Multi-model Consensus** - 6 AI models voting on token sentiment
- **Transparent reasoning** - See WHY AI thinks what it thinks

### 3. Regulatory Awareness
- Clear disclaimers preventing financial advice liability
- Educational framing ("sentiment tracker" not "trading signals")
- Experimental feature warnings
- DYOR (Do Your Own Research) emphasized

### 4. Bilingual from Day 1
- English + Indonesian = 350M+ addressable market
- Underserved SEA crypto community
- Cultural adaptation, not just translation

### 5. Real Data, Not Mocks
- Live Solana blockchain data
- Real-time Dexscreener prices
- Actual Rugcheck security scores
- Metaplex token metadata

### 6. Degen Mode
- First whale tracker with "vibe shift" UI
- Appeals to crypto-native users
- Viral potential through unique aesthetics

---

## 🔐 Security & Privacy

- ✅ **No private keys stored** - Uses Solana Wallet Adapter
- ✅ **Client-side scanning** - No sensitive data sent to servers
- ✅ **Read-only RPC calls** - Cannot move user funds
- ✅ **Public API endpoints** - No authentication required
- ✅ **Open source** - Full code transparency

---

## 📊 Roadmap

### Phase 1: Post-Hackathon (Q1 2025)
- [ ] Telegram bot for instant whale alerts
- [ ] Portfolio tracking (multiple tokens)
- [ ] Historical whale pattern analysis
- [ ] More languages (Spanish, Chinese, Japanese)

### Phase 2: Mobile & Extensions (Q2 2025)
- [ ] React Native mobile app
- [ ] Browser extension (Chrome/Firefox)
- [ ] Discord bot integration
- [ ] Watchlist & notifications

### Phase 3: Advanced Features (Q3 2025)
- [ ] Premium tier (advanced analytics)
- [ ] AI training on custom strategies
- [ ] Cross-chain support (Ethereum, Base)
- [ ] Community DAO governance

### Phase 4: Scale (Q4 2025)
- [ ] 1M+ users milestone
- [ ] Institutional API
- [ ] White-label solutions
- [ ] Revenue sharing for contributors

---

## 🏆 Hackathon Highlights

**Why BigFishAlert Should Win Consumer Apps Track:**

1. **📱 Actually Consumer-Friendly**
   - No blockchain knowledge required
   - Beautiful UI, not "developer tool"
   - Onboards non-crypto users

2. **🚀 Real Innovation**
   - First AI whale prediction on Solana
   - Multi-model consensus voting
   - Degen mode aesthetic innovation

3. **🌍 Market Opportunity**
   - 275M+ Indonesian speakers underserved
   - Whale tracking = proven pain point
   - Viral mechanics (leaderboard, sharing)

4. **💎 Technical Excellence**
   - Next.js 16 with Turbopack
   - Anchor smart contract
   - GPT-4 integration
   - Real-time data processing

5. **✅ Fully Functional**
   - Live deployment: [bigfishalert.vercel.app](https://bigfishalert.vercel.app)
   - Working AI predictions
   - Real Solana data
   - Open source code

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

```bash
# Fork the repo
git clone https://github.com/YOUR_USERNAME/BigFishAlert.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and commit
git commit -m "Add amazing feature"

# Push and create PR
git push origin feature/amazing-feature
```

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

**TL;DR:** Free to use, modify, and distribute. Attribution appreciated!

---

## 🙏 Acknowledgments

**Special Thanks:**
- 🏛 **Solana Foundation** - For the incredible blockchain
- 🌊 **Raydium** - Consumer Apps track sponsor
- ⚡ **Helius** - Fast RPC infrastructure
- 🤖 **OpenAI** - GPT-4 API access
- ⚓ **Anchor Community** - Smart contract framework
- 🎨 **shadcn** - Beautiful UI components

**Inspiration:**
- Whale Alert (Twitter bot)
- Nansen (Ethereum analytics)
- Bubblemaps (Token visualization)

---

## 📞 Contact & Links

- 🌐 **Website:** [https://bigfishalert.vercel.app](https://bigfishalert.vercel.app)
- 📂 **GitHub:** [https://github.com/yt2025id-lab/BigFishAlert](https://github.com/yt2025id-lab/BigFishAlert)
- 🐦 **Twitter:** [@bigfishalert](https://twitter.com/bigfishalert) *(coming soon)*
- 📧 **Email:** hello@bigfishalert.xyz *(coming soon)*

---

## 📸 Screenshots

### Professional Mode
![Professional Mode](https://via.placeholder.com/800x500/1e40af/ffffff?text=Professional+Mode)

### Degen Mode
![Degen Mode](https://via.placeholder.com/800x500/14b8a6/000000?text=Degen+Mode)

### AI Whale Prediction
![AI Prediction](https://via.placeholder.com/800x500/8b5cf6/ffffff?text=AI+Whale+Prediction)

### AI Trading Consensus
![Trading Consensus](https://via.placeholder.com/800x500/f59e0b/000000?text=AI+Trading+Consensus)

---

<div align="center">

## 🐟 Protecting Small Fish from Big Fish

### Built for Solana Cypherpunk Hackathon 2025

**[🎬 Watch Demo](https://youtube.com/...)** • **[🚀 Try Live App](https://bigfishalert.vercel.app)** • **[📖 Read Docs](./docs)**

[![Star on GitHub](https://img.shields.io/github/stars/yt2025id-lab/BigFishAlert?style=social)](https://github.com/yt2025id-lab/BigFishAlert)

---

*Made with ❤️ for the Solana community*

</div>
