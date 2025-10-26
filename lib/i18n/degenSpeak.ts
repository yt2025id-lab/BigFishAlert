export const degenSpeak = {
  en: {
    // Hero
    tagline: "WHALE HUNTER SZN 🚀 LFG!",
    heroTitle: "DON'T GET REKT BY WHALES 🐋",
    heroSubtitle: "Track whale moves or get DUMPED ON ser! 💎🙌",

    // Risk Levels
    riskSafe: "✅ SAFE AS USDC",
    riskLow: "🟢 Looks Gud Ser",
    riskMedium: "🟡 DYOR Anon",
    riskHigh: "🔴 SUS AF",
    riskDanger: "☠️ RUGPULL IMMINENT",

    // Actions
    connectWallet: "WAGMI 🚀 Connect",
    disconnect: "Peace Out ✌️",
    scanning: "Sniffing for rugs... 🐽",
    castNet: "🎣 CAST NET",
    apeIn: "🔥 APE IN",

    // Status
    loading: "Hold ser... 🚀",
    success: "LFG! 🚀💎",
    error: "Ser this is not valid 😭",

    // Prompts
    inputPlaceholder: "Paste token or get REKT 💀",
    noWallet: "Connect wallet ser! 🦍",

    // Results
    bigFishScore: "Degen Risk Score",
    topHolders: "🐋 Big Fish Wallets",

    // AI Explanations Templates
    aiSafe: "Anon this looks safe 🟢. Big fish are chillin, ocean is deep 🌊. Good entry for diamond hands 💎🙌",
    aiCaution: "Ser be careful 🟡. Some whales moving, could pump could dump. DYOR before aping 🧐",
    aiDanger: "BRUH 🔴 this is SUS! Whales own {percentage}% - one dump and ur cooked 💀. Don't ape unless ur a degen",

    // Fisher Ranks (Degen Version)
    rankMinnow: "Paper Hands 🧻",
    rankFisher: "Ser 🎣",
    rankCaptain: "Based ⚓",
    rankAdmiral: "Gigachad 👑",

    // Social Proof
    watchingNow: "🔥 {count} degens watching",
    lastScan: "👀 Last scan: {time} ago by @{user}",
    trending: "🚨 Trending: {token} ({scans} scans/min)",

    // Stats
    totalScans: "Total Catches",
    bigFishFound: "Whales Caught 🐋",
    reputation: "Chad Points ⭐",

    // Navigation
    scanner: "Scanner 🔍",
    ocean: "My Bags 💼",
    activity: "Whale Alerts 🚨",
    leaderboard: "Top Chads 👑",

    // Misc
    share: "Share ur catch 📱",
    notFinancialAdvice: "Not financial advice ser - DYOR! 🦍",
  },

  id: {
    // Hero
    tagline: "MUSIM BERBURU PAUS 🚀 GASKEUN!",
    heroTitle: "JANGAN SAMPAI KENA TIPU PAUS 🐋",
    heroSubtitle: "Lacak gerakan paus atau nyesel bro! 💎🙌",

    // Risk Levels
    riskSafe: "✅ AMAN BGT CUY",
    riskLow: "🟢 Kayanya Oke Bos",
    riskMedium: "🟡 Riset Dulu Bro",
    riskHigh: "🔴 BAHAYA NIH",
    riskDanger: "☠️ JANGAN CUY - SCAM!",

    // Actions
    connectWallet: "WAGMI 🚀 Konek",
    disconnect: "Cabut Dulu ✌️",
    scanning: "Ngecek ikan besar... 🐽",
    castNet: "🎣 LEMPAR JALA",
    apeIn: "🔥 BELI SEKARANG",

    // Status
    loading: "Tunggu bro... 🚀",
    success: "GASKEUN! 🚀💎",
    error: "Bro alamat salah 😭",

    // Prompts
    inputPlaceholder: "Paste token atau nyesel 💀",
    noWallet: "Konek wallet dulu bro! 🦍",

    // Results
    bigFishScore: "Skor Risiko Degen",
    topHolders: "🐋 Wallet Ikan Besar",

    // Fisher Ranks
    rankMinnow: "Ikan Teri 🧻",
    rankFisher: "Mancing Bos 🎣",
    rankCaptain: "Sultan ⚓",
    rankAdmiral: "Raja Kripto 👑",

    // Social Proof
    watchingNow: "🔥 {count} orang lagi liat",
    lastScan: "👀 Scan terakhir: {time} lalu oleh @{user}",
    trending: "🚨 Trending: {token} ({scans} scan/menit)",

    // Misc
    share: "Share tangkapanmu 📱",
    notFinancialAdvice: "Bukan saran keuangan - riset sendiri ya! 🦍",
  }
};

export function getDegenText(
  key: keyof typeof degenSpeak.en,
  language: 'en' | 'id' = 'en',
  replacements?: Record<string, string | number>
): string {
  let text = (degenSpeak[language] as any)[key] || degenSpeak.en[key];

  if (replacements) {
    Object.keys(replacements).forEach(replaceKey => {
      text = text.replace(`{${replaceKey}}`, String(replacements[replaceKey]));
    });
  }

  return text;
}

export function getRiskLabelDegen(score: number, language: 'en' | 'id' = 'en'): string {
  if (score >= 90) return getDegenText('riskDanger', language);
  if (score >= 70) return getDegenText('riskHigh', language);
  if (score >= 50) return getDegenText('riskMedium', language);
  if (score >= 30) return getDegenText('riskLow', language);
  return getDegenText('riskSafe', language);
}
