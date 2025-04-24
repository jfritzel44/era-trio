import type React from "react";
import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Head from "next/head";

const serif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "The Era Trio | Chicago's Funk & Jazz Experience",
  description:
    "Chicago's own The Era Trio brings a vibrant blend of funk, blues, soul, and jazz to every stage they play.",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico", // general favicon
    shortcut: "/favicon.ico", // browser shortcut
    apple: "/favicon.ico", // Apple devices
    other: {
      rel: "mask-icon",
      url: "/favicon.ico",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${serif.variable} ${sans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
