export const translations = {
  en: {
    // Header
    appName: "BigFishAlert",
    tagline: "Track the Big Fish in Crypto Ocean",
    connectWallet: "Connect Wallet",
    disconnect: "Disconnect",

    // Navigation
    scanner: "Token Scanner",
    ocean: "Ocean Monitor",
    activity: "Big Fish Activity",
    leaderboard: "Leaderboard",

    // Token Scanner
    scanToken: "Scan Token",
    tokenAddress: "Token Address",
    castYourNet: "Cast Your Net",
    scanning: "Scanning the ocean...",
    bigFishScore: "Big Fish Score",
    topHolders: "Top 10 Big Fish",
    riskLevel: "Risk Level",

    // Risk Levels
    riskHigh: "DANGER - Big Fish Leaving",
    riskMedium: "CAUTION - Watch Carefully",
    riskLow: "SAFE - Calm Waters",

    // Ocean Monitor
    scanOcean: "Scan My Ocean",
    yourPortfolio: "Your Portfolio",
    noTokens: "No fish in your net yet. Connect wallet to start fishing!",

    // Big Fish Activity
    liveActivity: "Live Ocean Activity",
    fishSwimmingIn: "Swimming In",
    fishSwimmingOut: "Swimming Out",

    // Fisher Reputation
    yourRank: "Your Fisher Rank",
    totalCatches: "Total Catches",
    bigFishFound: "Big Fish Found",
    reputation: "Reputation",

    // Ranks
    rankMinnow: "Minnow",
    rankFisher: "Fisher",
    rankCaptain: "Captain",
    rankAdmiral: "Admiral",

    // Actions
    share: "Share Your Catch",
    swap: "Trade on Jupiter",
    details: "View Details",

    // Status
    loading: "Casting fishing rod...",
    error: "Lost signal in the deep ocean",
    success: "Big fish spotted!",

    // AI Prompts
    aiAnalyzing: "AI is analyzing the ocean...",

    // Time
    ago: "ago",
    seconds: "s",
    minutes: "m",
    hours: "h",
    days: "d",
  },

  id: {
    // Header
    appName: "BigFishAlert",
    tagline: "Lacak Ikan Besar di Lautan Kripto",
    connectWallet: "Hubungkan Dompet",
    disconnect: "Putuskan",

    // Navigation
    scanner: "Pemindai Token",
    ocean: "Monitor Lautan",
    activity: "Aktivitas Ikan Besar",
    leaderboard: "Papan Peringkat",

    // Token Scanner
    scanToken: "Pindai Token",
    tokenAddress: "Alamat Token",
    castYourNet: "Lempar Jalamu",
    scanning: "Memindai lautan...",
    bigFishScore: "Skor Ikan Besar",
    topHolders: "10 Ikan Besar Teratas",
    riskLevel: "Tingkat Risiko",

    // Risk Levels
    riskHigh: "BAHAYA - Ikan Besar Pergi",
    riskMedium: "HATI-HATI - Perhatikan Baik-Baik",
    riskLow: "AMAN - Perairan Tenang",

    // Ocean Monitor
    scanOcean: "Pindai Lautanku",
    yourPortfolio: "Portofolio Anda",
    noTokens: "Belum ada ikan di jalamu. Hubungkan dompet untuk mulai memancing!",

    // Big Fish Activity
    liveActivity: "Aktivitas Lautan Langsung",
    fishSwimmingIn: "Berenang Masuk",
    fishSwimmingOut: "Berenang Keluar",

    // Fisher Reputation
    yourRank: "Peringkat Nelayan Anda",
    totalCatches: "Total Tangkapan",
    bigFishFound: "Ikan Besar Ditemukan",
    reputation: "Reputasi",

    // Ranks
    rankMinnow: "Ikan Kecil",
    rankFisher: "Nelayan",
    rankCaptain: "Kapten",
    rankAdmiral: "Admiral",

    // Actions
    share: "Bagikan Tangkapanmu",
    swap: "Perdagangkan di Jupiter",
    details: "Lihat Detail",

    // Status
    loading: "Melempar pancing...",
    error: "Kehilangan sinyal di lautan dalam",
    success: "Ikan besar terlihat!",

    // AI Prompts
    aiAnalyzing: "AI sedang menganalisis lautan...",

    // Time
    ago: "yang lalu",
    seconds: "d",
    minutes: "m",
    hours: "j",
    days: "h",
  },
};

export type Language = 'en' | 'id';

export function t(key: string, lang: Language = 'en'): string {
  return (translations[lang] as any)[key] || (translations.en as any)[key] || key;
}
