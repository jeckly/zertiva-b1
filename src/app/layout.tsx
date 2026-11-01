import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "GoetheMeister B1 Studio | Goethe-Zertifikat B1 Exam Studio & Game Arena",
  description:
    "GoetheMeister B1 Studio (GMB1) - Simulator Ujian Resmi Goethe-Zertifikat B1 (Lesen, Hören, Schreiben, Sprechen), Game Arena Interaktif (Easy, Medium, Hard), Bulletproof Audio de-DE, Kamus Meine Vokabeln & Sertifikat Digital.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
