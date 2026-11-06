import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "그리다, 스튜디오 — 웹사이트를 그립니다",
  description:
    "그리다, 스튜디오의 웹사이트 작업 포트폴리오입니다. 기획부터 디자인, 제작까지 한 장의 그림처럼 그려 낸 작업들을 소개합니다.",
  openGraph: {
    title: "그리다, 스튜디오",
    description: "웹사이트를 그립니다.",
    images: ["/brand/grida-logo-horizontal.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
