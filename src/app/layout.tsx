import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Divya Singh — Full-Stack Developer & DevOps Engineer",
  description:
    "Portfolio of Divya Singh — CS & Data Science undergrad building production-grade full-stack applications, cloud infrastructure, and AI-powered research tools. 500+ DSA problems solved.",
  keywords: [
    "Divya Singh",
    "Full-Stack Developer",
    "DevOps Engineer",
    "AI",
    "RAG",
    "Portfolio",
    "React",
    "Next.js",
    "AWS",
    "Terraform",
    "Competitive Programming",
  ],
  authors: [{ name: "Divya Singh" }],
  creator: "Divya Singh",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Divya Singh — Full-Stack Developer & DevOps Engineer",
    description:
      "CS & Data Science undergrad building production-grade full-stack apps, cloud infrastructure, and AI-powered tools.",
    siteName: "Divya Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divya Singh — Full-Stack Developer & DevOps Engineer",
    description:
      "CS & Data Science undergrad building production-grade full-stack apps, cloud infrastructure, and AI-powered tools.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#050505" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <Preloader />
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
