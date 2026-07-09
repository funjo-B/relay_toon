import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Relay — 혼자 그리던 웹툰은 끝났다",
  description:
    "AI가 세계관을 기억하고, 수천 명이 함께 그리는 끝나지 않는 이야기. 한 문장이면 오늘 당신도 이 세계에 한 컷을 더한다.",
  keywords: [
    "AI 웹툰",
    "릴레이 웹툰",
    "협업 창작",
    "AI 감독",
    "웹툰 플랫폼",
    "AI Relay",
  ],
  openGraph: {
    title: "AI Relay — 혼자 그리던 웹툰은 끝났다",
    description:
      "AI가 기억하고, 모두가 함께 그리는 끝나지 않는 이야기. AI 협업 릴레이 웹툰 플랫폼.",
    type: "website",
    locale: "ko_KR",
    siteName: "AI Relay",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Relay — 혼자 그리던 웹툰은 끝났다",
    description: "AI가 기억하고, 모두가 함께 그리는 끝나지 않는 이야기.",
  },
};

export const viewport: Viewport = {
  themeColor: "#16171D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
