import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";
import { ThemeProvider } from "@/lib/contexts/ThemeContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BigFishAlert - Track the Big Fish in Crypto Ocean",
  description: "Real-time whale monitoring platform that protects retail traders from market manipulation on Solana",
  keywords: ["Solana", "DeFi", "Whale Tracking", "Crypto", "Token Analysis"],
  authors: [{ name: "BigFishAlert Team" }],
  openGraph: {
    title: "BigFishAlert - Track the Big Fish in Crypto Ocean",
    description: "Real-time whale monitoring for Solana DeFi",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BigFishAlert",
    description: "Track the Big Fish in Crypto Ocean",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider>
          <WalletProvider>
            {children}
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
