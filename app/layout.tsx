import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Setthi — Intelligent Financial Companion",
  description: "Chat with your money in plain English. Private, grounded, and 100% free.",
  icons: {
    icon: "/Setthi.png",
    shortcut: "/Setthi.png",
    apple: "/Setthi.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <head>
        <link
          rel="preload"
          href="/ai_companion.riv"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className="min-h-screen bg-[#000000] text-[#EDEDED]">
        {children}
      </body>
    </html>
  );
}
