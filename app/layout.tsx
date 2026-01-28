import type { Metadata } from "next";
import { Space_Grotesk, Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-main",
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
  title: "MitoFlow40 | 40代からの健康戦略 - 小林大介",
  description:
    "映像クリエイターが運営する、細胞レベルの健康戦略。ミトコンドリア活性化で40代からの人生をフローさせる。パーソナルヘルスケアサービス by 小林大介",
  keywords: [
    "健康",
    "40代",
    "ミトコンドリア",
    "パーソナルヘルスケア",
    "小林大介",
    "MitoFlow40",
  ],
  authors: [{ name: "小林大介" }],
  openGraph: {
    title: "MitoFlow40 | 40代からの健康戦略",
    description:
      "映像クリエイターが運営する、細胞レベルの健康戦略。ミトコンドリア活性化で40代からの人生をフローさせる。",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
