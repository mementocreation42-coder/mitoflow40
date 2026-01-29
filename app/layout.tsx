import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import { Space_Grotesk, Inter, Noto_Sans_JP, MuseoModerno } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});

const museoModerno = MuseoModerno({
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mitoflow40 | 40代からはじめる健康戦略ミトフロー",
  description:
    "40代。それはカラダの本当の声が無視できなくなる年齢。ミトコンドリア活性化で40代からの人生をフローさせる。パーソナルヘルスケアサービス by DAISUKE KOBAYASHI",
  keywords: [
    "健康",
    "40代",
    "ミトコンドリア",
    "パーソナルヘルスケア",
    "小林大介",
    "Mitoflow40",
  ],
  authors: [{ name: "小林大介" }],
  openGraph: {
    title: "Mitoflow40 | 40代からはじめる健康戦略ミトフロー",
    description:
      "40代。それはカラダの本当の声が無視できなくなる年齢。ミトコンドリア活性化で40代からの人生をフローさせる。パーソナルヘルスケアサービス by DAISUKE KOBAYASHI",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable} ${museoModerno.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
