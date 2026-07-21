"use client";

import { cloneElement, isValidElement, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const childrenWithSharedProps = isValidElement(children)
    ? cloneElement(children, {
        favoriteIds,
        setFavoriteIds,
      })
    : children;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="min-h-full">
          <Navbar />
          <main className="min-h-[calc(100vh-65px)]">{childrenWithSharedProps}</main>
        </div>
      </body>
    </html>
  );
}
