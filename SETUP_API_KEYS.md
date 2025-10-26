# 🔑 API Keys Setup Guide

## Step 1: Get Helius API Key (CRITICAL - 5 minutes)

### Option A: Free Tier (Recommended for Hackathon)
1. Go to https://www.helius.dev/
2. Click "Start Building" or "Sign Up"
3. Sign up with GitHub/Email
4. Create new project:
   - Name: "BigFishAlert"
   - Network: **Devnet** (for testing)
5. Copy your API key

### Option B: Use Public RPC (No signup, but slower)
- Skip Helius, we'll use public Solana RPC
- Some features may be limited

---

## Step 2: Get OpenAI API Key (Optional - for AI explanations)

1. Go to https://platform.openai.com/
2. Sign up / Login
3. Go to API Keys section
4. Create new key
5. Copy it immediately (shown only once!)

**Cost:** ~$0.002 per scan (very cheap)
**Alternative:** Skip this, AI explanations will be disabled

---

## Step 3: Update `.env.local` File

Open file: `c:\Users\T470\Documents\hackathon2025\Big Fish Alert\bigfishalert\.env.local`

Replace with your actual keys:

```env
# Helius RPC & API Keys
NEXT_PUBLIC_HELIUS_API_KEY=your_helius_key_here
NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=your_helius_key_here

# OpenAI API Key (optional)
OPENAI_API_KEY=your_openai_key_here

# Solana Network
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_HOST=https://api.devnet.solana.com

# Anchor Program ID (will be generated after deployment)
NEXT_PUBLIC_PROGRAM_ID=
```

---

## Step 4: Test Tokens for Devnet

**IMPORTANT:** Dexscreener and Rugcheck APIs primarily work with **MAINNET** tokens!

For testing, use these **MAINNET** token addresses:

### Safe Tokens (Low Risk Score):
```
SOL (Wrapped):
So11111111111111111111111111111111111111112

USDC:
EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v

BONK:
DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263
```

### Risky Tokens (High Risk Score):
```
Use any new meme coin with:
- High holder concentration
- Low liquidity
- Recent launch
```

---

## Step 5: Restart Dev Server

After updating `.env.local`:

```bash
# Stop current server (Ctrl+C)
# Restart
npm run dev
```

---

## Step 6: Test the Scanner

1. Open http://localhost:3000
2. Connect wallet (Phantom/Solflare)
3. Paste SOL address: `So11111111111111111111111111111111111111112`
4. Click "CAST NET" button
5. **Watch for:**
   - ✅ Real token name appears
   - ✅ Real holder data loads
   - ✅ Price from Dexscreener
   - ✅ Liquidity data
   - ✅ Risk score calculated
   - ✅ Speedometer animates

---

## 🚨 Troubleshooting

### Issue: "Failed to scan token"
**Check:**
- API keys are correct in `.env.local`
- No extra spaces in keys
- Restarted dev server after editing `.env.local`

### Issue: "Unknown Token" or no data
**Likely causes:**
- Token doesn't exist on Devnet
- Use MAINNET tokens for full data
- Dexscreener only has MAINNET data

### Issue: "No holders found"
**Solutions:**
- Try a popular token (SOL, USDC, BONK)
- Check if Helius API key is valid
- Falls back to public RPC (slower)

---

## 🎯 Quick Test Without API Keys

**If you don't have time to get API keys:**

We can test with **mock mode** by using public RPC:

1. Leave `NEXT_PUBLIC_HELIUS_API_KEY` empty
2. App will use public Solana RPC
3. Dexscreener works without key
4. Rugcheck works without key
5. Only Helius features are limited

**This is enough for hackathon demo!**

---

## ✅ Verification Checklist

After setup, verify:

- [ ] `.env.local` file updated
- [ ] Dev server restarted
- [ ] Can scan SOL token
- [ ] See real holder data
- [ ] See real price data
- [ ] Risk score calculates
- [ ] Speedometer animates

**Once verified → You have WORKING REAL DATA! 🎉**

---

## 📊 API Rate Limits

### Helius (Free Tier):
- 100,000 requests/month
- ~3,300 requests/day
- Enough for hackathon demo

### Dexscreener:
- 300 requests/minute
- No key required
- Public API

### Rugcheck:
- Rate limited but generous
- No key required
- Public API

### OpenAI:
- Pay per use (~$0.002/request)
- Set usage limits in dashboard
- Budget $5 = 2,500 scans

---

**NEXT STEP:** After you get the API keys, paste them in `.env.local` and tell me. Then we'll test with real tokens! 🚀
